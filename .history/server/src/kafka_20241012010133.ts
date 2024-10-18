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

const send

export default kafka;