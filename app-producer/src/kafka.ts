import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'main',
    brokers: ['localhost:9092'],
    retry: {
        retries: 3
    },
    logLevel: logLevel.NOTHING
});

export const producer = kafka.producer();
