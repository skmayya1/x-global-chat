import { Kafka, Producer } from "kafkajs";
import fs from 'fs'
import path from 'path'

const kafka = new Kafka({
    brokers: ['http://kafka-2a705445-chat-app-redis-scalable.h.aivencloud.com:11490/'],
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
    const _producer = kafka.producer();
    await _producer.connect();
     producer = _producer;
    return producer;
}

export const sendMessage = async (topic: string, message: string) => {
    const producer = await createProducer();
    await producer.send({
        topic="",
        messages: [
            { value: message ,key: Date.now().toString()},
        ],
    })
    
}
export default kafka;