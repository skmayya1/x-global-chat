import { Kafka, Partitioners, Producer } from "kafkajs";
import fs from 'fs'
import path from 'path'

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
            { value: message ,key: Date.now().toString()},
        ],
    })
    console.log('Message sent:', message);
}
export async function consumeMessage() {
    const consumer = kafka.consumer({ groupId: 'chat-app' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'MESSAGES', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message, pause }) => {
            a
            console.log({
                value: message.value.toString(),
            });
        },
    })
}
export default kafka;