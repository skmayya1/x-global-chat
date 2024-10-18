import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
    brokers: [],
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
        topic,
        messages: [
            { value: message ,key: Date.now().toString()},
        ],
   })
}
export const 
export default kafka;