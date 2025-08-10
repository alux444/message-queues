import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "producer-service",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function produce() {
  await producer.connect();
  console.log("Producer connected");

  setInterval(async () => {
    const msg = { value: `Hello at ${new Date().toISOString()}` };
    await producer.send({
      topic: "test-topic",
      messages: [msg],
    });
    console.log("Sent:", msg.value);
  }, 2000);
}

produce().catch(console.error);
