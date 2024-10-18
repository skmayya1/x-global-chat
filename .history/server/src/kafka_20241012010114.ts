import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

const  createProducer = async () => {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: "test-topic",
        messages: [
            { value: "Hello KafkaJS user!" },
        ],
    });
    await producer.disconnect();
}

export default kafka;