import { kafka } from "./kafka";

const producer = kafka.producer();

async function start() {
  await producer.connect();
  console.log("Order Service connected");

  // Simulate receiving an order
  setInterval(async () => {
    const orderId = Math.floor(Math.random() * 1000);
    const order = { orderId, items: ["item1", "item2"], total: 49.99 };
    await producer.send({
      topic: "orders",
      messages: [{ value: JSON.stringify(order) }],
    });
    console.log("Order created:", order);
  }, 5000);
}

start().catch(console.error);
