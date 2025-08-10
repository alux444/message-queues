import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "consumer-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

async function consume() {
  await consumer.connect();
  console.log("Consumer connected");

  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("Received:", message.value?.toString());
    },
  });
}

consume().catch(console.error);
