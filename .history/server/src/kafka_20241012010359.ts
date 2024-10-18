import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: [],
});

let producer: = null;

const createProducer = async () => {
    if(producer) return producer;
    const _producer = kafka.producer();
    await _producer.connect();
     producer = _producer;
    return producer;
}

const sendMessage = async (topic: string, message: string) => {
    const producer = await createProducer();
   
}

export default kafka;