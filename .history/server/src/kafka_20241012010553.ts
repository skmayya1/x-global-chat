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

const sendMessage = async (topic: string, message: string) => {
    const producer = await createProducer();
    await producer.send({
        topic,
        messages: [
            { value: message ,: Date.now().toString()},
        ],
   })
}

export default kafka;