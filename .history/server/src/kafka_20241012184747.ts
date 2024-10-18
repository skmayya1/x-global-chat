import { Kafka, Partitioners, Producer } from "kafkajs";
import fs from 'fs'
import path from 'path'
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
    }
});


let producer:Producer | null = null;

const createProducer = async () => {
    if(producer) return producer;
    const _producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner,
    });
    await _producer.connect();
     producer = _producer;
    return producer;
}

export const sendMessage = async ( message: string) => {
    const producer = await createProducer();
    console.log('Sending message:', message);
    await producer.send({
        topic:"MESSAGES",
        messages: [
            { value: JSON.stringify(message) message ,key: Date.now().toString()},
        ],
    })
    console.log('Message sent:', message);
}
export async function consumeMessages() {
    console.log('running consumer kafka');
    
    const consumer = kafka.consumer({ groupId: 'chat-app' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if (!message.value) return;

            let data;
            try {
                // Attempt to parse the message
                data = JSON.parse(message.value.toString());
            } catch (parseError) {
                console.log('Failed to parse message:', message.value.toString(), parseError);
                return; // Skip this message and continue with the next one
            }

            // Validate the parsed data
            if (!data.message || !data.kinderId || !data.sender_name || !data.createdAt || !data.picture) {
                console.log('Invalid message format:', data);
                return; // Skip this message if the data is incomplete
            }

            try {
                // Save the message to the database
                await prisma.message.create({
                    data: {
                        text: data.message,
                        kinderId: data.kinderId,
                        sender_name: data.sender_name,
                        createdAt: new Date(data.createdAt),
                        picture: data.picture,
                    },
                });
                console.log('Message saved to the database:', data);
            } catch (error) {
                console.log('Error saving message to the database:', error);
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: 'MESSAGES' }]);
                }, 10000); // Retry after 10 seconds
            }
        },
    });
}

export default kafka;
