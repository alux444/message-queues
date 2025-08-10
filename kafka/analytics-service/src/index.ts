import { kafka } from "./kafka.ts";
import type { EachMessagePayload } from "kafkajs";

const consumer = kafka.consumer({ groupId: "analytics-service" });

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: false });
  await consumer.subscribe({ topic: "payments", fromBeginning: false });
  await consumer.subscribe({ topic: "inventory-updates", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      console.log(`Analytics Service: Topic=${topic}, Data=${message.value?.toString()}`);
    },
  });
}

start().catch(console.error);
