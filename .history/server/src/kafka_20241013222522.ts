import { Kafka, Partitioners, Producer, logLevel } from "kafkajs";
import fs from 'fs';
import path from 'path';
import prisma from "./prisma";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


// Kafka Configuration
const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    ssl: {
        ca: [fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')],
    },
    sasl: {
        username: 'avnadmin',
        password: 'AVNS_WQu8_Ct4MxwyoYQPf4D',
        mechanism: 'plain',
    },
    connectionTimeout: 15000,
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
    return producer;
}

// Send Message
export const sendMessage = async (message: string) => {
    const producer = await createProducer();
    try {
        await producer.send({
            topic: "MESSAGES",
            messages: [
                { value: JSON.stringify(message), key: Date.now().toString() },
            ],
        });
    } catch (error) {
    }
}

// Delete Message
export const deleteMessage = async (mID: string) => {
    const producer = await createProducer();
    try {
        await producer.send({
            topic: "DELETE",
            messages: [
                { value: mID, key: Date.now().toString() },
            ],
        });
    } catch (error) {
    }
}

// Consume Messages
export async function consumeMessages() {
    const consumer = kafka.consumer({ groupId: 'messages-consumer' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ message, partition, topic }) => {
            if (!message.value) return;

            let data;
            try {
                data = JSON.parse(message.value.toString());
            } catch (parseError) {
                return;
            }

            try {
                await prisma.message.create({
                    data: {
                        mID: data.mID,
                        text: data.text,
                        kinderId: data.kinderId,
                        sender_name: data.sender_name,
                        createdAt: data.createdAt,
                        picture: data.picture,
                        ReplyToId: data.ReplyToId,
                        ReplyToNAme: data.ReplyToNAme,
                        ReplyToText: data.ReplyToText,
                    },
                });
                await consumer.commitOffsets([{ topic, partition, offset: (BigInt(message.offset) + BigInt(1)).toString() }]);
            } catch (dbError) {
            }
        },
    });
}

// Consume Delete Messages
export async function consumeDeleteMessages() {
    const consumer = kafka.consumer({ groupId: 'delete-messages-consumer' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'DELETE', fromBeginning: true });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ message, partition, topic }) => {
            if (!message.value) return;

            const mID = message.value.toString();
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
