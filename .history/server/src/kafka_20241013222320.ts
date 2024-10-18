import { Kafka, Partitioners, Producer, logLevel } from "kafkajs";
import fs from 'fs';
import path from 'path';
import prisma from "./prisma";
import dotenv from 'dotenv';
import Pino from 'pino';

// Load environment variables
dotenv.config();

// Initialize logger
const logger = Pino({ level: process.env.LOG_LEVEL || 'info' });

// Kafka Configuration
const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    ssl: {
        ca: [fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')],
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: 'plain',
    },
    connectionTimeout: 15000,
    logLevel: logLevel.INFO,
});

// Producer Instance
let producer: Producer | null = null;

const createProducer = async () => {
    if (producer) return producer;
    const _producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
    });
    await _producer.connect();
    producer = _producer;
    logger.info('Kafka producer connected');
    return producer;
}

// Send Message
export const sendMessage = async (message: string) => {
    const producer = await createProducer();
    logger.info({ message }, 'Sending message');
    try {
        await producer.send({
            topic: "MESSAGES",
            messages: [
                { value: JSON.stringify(message), key: Date.now().toString() },
            ],
        });
        logger.info('Message sent successfully');
    } catch (error) {
        logger.error({ error }, 'Failed to send message');
    }
}

// Delete Message
export const deleteMessage = async (mID: string) => {
    const producer = await createProducer();
    logger.info({ mID }, 'Deleting message');
    try {
        await producer.send({
            topic: "DELETE",
            messages: [
                { value: mID, key: Date.now().toString() },
            ],
        });
        logger.info('Message delete request sent');
    } catch (error) {
        logger.error({ error }, 'Failed to send delete request');
    }
}

// Consume Messages
export async function consumeMessages() {
    const consumer = kafka.consumer({ groupId: 'messages-consumer' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });
    logger.info('Subscribed to MESSAGES topic');

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ message, partition, topic }) => {
            if (!message.value) return;

            let data;
            try {
                data = JSON.parse(message.value.toString());
                logger.info({ data }, 'Processing message');
            } catch (parseError) {
                logger.error({ parseError }, 'Failed to parse message');
                return;
            }

            try {
                await prisma.message.create({
                    data: {
                        mID: data.mID,
                        text: data.text,
                        kinderId: data.kinderId,
                        sender_name: data.sender_name,
                        createdAt: new Date(data.createdAt),
                        picture: data.picture,
                        ReplyToId: data.ReplyToId,
                        ReplyToName: data.ReplyToName,
                        ReplyToText: data.ReplyToText,
                    },
                });
                logger.info({ data }, 'Message saved to the database');
                await consumer.commitOffsets([{ topic, partition, offset: (BigInt(message.offset) + BigInt(1)).toString() }]);
            } catch (dbError) {
                logger.error({ dbError }, 'Error saving message to the database');
            }
        },
    });
}

// Consume Delete Messages
export async function consumeDeleteMessages() {
    const consumer = kafka.consumer({ groupId: 'delete-messages-consumer' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'DELETE', fromBeginning: true });
    logger.info('Subscribed to DELETE topic');

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ message, partition, topic }) => {
            if (!message.value) return;

            const mID = message.value.toString();
            logger.info({ mID }, 'Processing delete request');
            try {
                await prisma.message.delete({
                    where: { mID },
                });
                logger.info({ mID }, 'Message deleted from the database');
                await consumer.commitOffsets([{ topic, partition, offset: (BigInt(message.offset) + BigInt(1)).toString() }]);
            } catch (dbError) {
                logger.error({ dbError }, 'Error deleting message from the database');
            }
        },
    });
}

export default kafka;
