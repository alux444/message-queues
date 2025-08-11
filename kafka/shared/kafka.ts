import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: process.env.SERVICE_NAME || "unknown-service",
  brokers: ["localhost:9092"],
});
