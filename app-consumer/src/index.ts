import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['localhost:9092'],
    retry: {
        retries: 3
    },
    logLevel: logLevel.NOTHING
});

const consumer = kafka.consumer({ groupId: 'user-group' });

const start = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic: 'user'
    });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('topic: ', topic)
            console.log('partition: ', partition)
            console.log('message: ', message.value.toString())
        }
    })
}

start()
    .catch(error => console.log(error));
