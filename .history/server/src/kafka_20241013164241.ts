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
            { value: JSON.stringify(message)  ,key: Date.now().toString()},
        ],
    })
    console.log('Message sent:', message);
}

export const deleteMessage = async (mID: string) => {
    const producer = await createProducer();
    console.log('Deleting message:', mID);
    await producer.send({
        topic:"DELETE",
        messages: [
            { value: mID ,key: Date.now().toString()},
        ],
    })
    console.log('Message deleted:', mID);
}
export async function consumeMessages() {
    console.log('running consumer Messages kafka');
    const consumer = kafka.consumer({ groupId: 'default' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if (!message.value) return;

            let data;
            try {

                data = JSON.parse(message.value.toString());
            } catch (parseError) {
                console.log('Failed to parse message:', message.value.toString(), parseError);
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
                console.log('Message saved to the database:', data);
            } catch (error) {
                console.log('Error saving message to the database:', error);
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: 'MESSAGES' }]);
                }, 10000); 
            }
        },
    });
}
export async function consumeDeleteMessages() {
    console.log('running consumer Delete kafka');
    const consumer = kafka.consumer({ groupId: 'default' });
    await consumer.connect();
    console.log('Consumer connected');
    await consumer.subscribe({ topic: 'DELETE', fromBeginning: true });
    console.log('Consumer subscribed');
    
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            console.log('Delete message:', message.value);
            if (!message.value) return;
            const mID = message.value.toString();
            try {
                await prisma.message.delete({
                    where: {
                        mID,
                    },
                });
                console.log('Message deleted from the database:', mID);
            } catch (error) {
                console.log('Error deleting message from the database:', error);
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: 'DELETE' }]);
                }, 10000); 
            }
        },
    });
    
}

export default kafka;
