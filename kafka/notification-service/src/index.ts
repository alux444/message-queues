import { kafka } from "../../shared/kafka.js";
import { type Message } from "kafkajs";

const consumer = kafka.consumer({ groupId: "notification-service" });

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: "payments", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }: { message: Message }) => {
      const payment = JSON.parse(message.value!.toString());
      console.log(`Notification Service: Sending email for order ${payment.orderId} - status: ${payment.status}`);
    },
  });
}

start().catch(console.error);
