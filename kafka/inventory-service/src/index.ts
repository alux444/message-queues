import { kafka } from "../../shared/kafka.js";
import type { EachMessagePayload } from "kafkajs";

const consumer = kafka.consumer({ groupId: "inventory-service" });
const producer = kafka.producer();

async function start() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      const order = JSON.parse(message.value!.toString());
      console.log("Inventory Service updating stock for order:", order);

      const update = { orderId: order.orderId, itemsUpdated: order.items };
      await producer.send({
        topic: "inventory-updates",
        messages: [{ value: JSON.stringify(update) }],
      });
    },
  });
}

start().catch(console.error);
