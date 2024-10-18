import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

const createProducer = async () => {
    if()
    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

const sendMessage = async (topic: string, message: string) => {
    const producer = await createProducer();
   
}

export default kafka;