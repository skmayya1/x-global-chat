import { Kafka, Partitioners, Producer, Consumer } from "kafkajs";
import fs from 'fs';
import path from 'path';
import prisma from "./prisma";

const kafka = new Kafka({
    brokers: ['kafka-2a705445-chat-app-redis-scalable.h.aivencloud.com:11490'],
    ssl: {
        ca: [fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')],
    },
    sasl: {
        username: 'avnadmin',
        password: 'AVNS_WQu8_Ct4MxwyoYQPf4D',
        mechanism: 'plain',
    },
    connectionTimeout: 15000
});

let producer: Producer | null = null;

const createProducer = async (): Promise<Producer> => {
    if (producer) return producer;

    const _producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
    });
    await _producer.connect();
    producer = _producer;
    return producer;
};

const logMessage = (action: string, data: any) => {
    console.log(`${action}:`, JSON.stringify(data, null, 2));
};

export const sendMessage = async (message: {
    mID: string;
    text: string;
    kinderId: string;
    sender_name: string;
    createdAt: string;
    picture?: string;
    ReplyToId?: string;
    ReplyToName?: string;
    ReplyToText?: string;
}) => {
    const producer = await createProducer();
    logMessage('Sending message', message);

    await producer.send({
        topic: "MESSAGES",
        messages: [
            { value: JSON.stringify(message), key: message.mID },
        ],
    });

    logMessage('Message sent', message);
};

export const deleteMessage = async (mID: string) => {
    const producer = await createProducer();
    logMessage('Deleting message', mID);

    await producer.send({
        topic: "DELETE",
        messages: [
            { value: mID, key: mID },
        ],
    });

    logMessage('Message deleted', mID);
};

const consumeMessagesHandler = async (consumer: Consumer) => {
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if (!message.value) return;

            let data;
            try {
                data = JSON.parse(message.value.toString());
                logMessage('Message received', data);
            } catch (parseError) {
                console.error('Failed to parse message:', message.value.toString(), parseError);
                return;
            }

            try {
                await prisma.message.create({
                    data:
                    {
                        mID: data.mID,
                        text: data.text,
                        kinderId: data.kinderId,
                        sender_name: data.sender_name,
                        createdAt: data.createdAt,
                        picture: data.picture,
                        ReplyToId: data.ReplyToId,
                        ReplyToNAme: data.ReplyToNAme,
                        ReplyToText: data.ReplyToText,
                    }
                });
                logMessage('Message saved to the database', data);
            } catch (error) {
                console.error('Error saving message to the database:', error);
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: 'MESSAGES' }]);
                }, 10000);
            }
        },
    });
};

export async function consumeMessages() {
    console.log('Starting consumer for Messages topic...');
    const consumer = kafka.consumer({ groupId: 'messages-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });
    console.log('Consumer subscribed to Messages topic');

    await consumeMessagesHandler(consumer);
}

const consumeDeleteMessagesHandler = async (consumer: Consumer) => {
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if (!message.value) return;
            const mID = message.value.toString();
            logMessage('Message received for deletion', mID);

            try {
                await prisma.message.delete({ where: { mID } });
                logMessage('Message deleted from the database', mID);
            } catch (error) {
                console.error('Error deleting message from the database:', error);
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: 'DELETE' }]);
                }, 5000);
            }
        },
    });
};

export async function consumeDeleteMessages() {
    console.log('Starting consumer for Delete topic...');
    const consumer = kafka.consumer({ groupId: 'delete-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'DELETE', fromBeginning: true });
    console.log('Consumer subscribed to Delete topic');

    await consumeDeleteMessagesHandler(consumer);

    setTimeout(async () => {
        await consumer.disconnect();
        console.log('Consumer disconnected from Delete topic');
    }, 10000);
}
