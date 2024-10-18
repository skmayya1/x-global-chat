import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

const  createProducer = async () => {
    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

const sendMessage = async (topic: string, message: string) => {
    

export default kafka;