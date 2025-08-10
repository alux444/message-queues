import { kafka } from "./kafka";

const consumer = kafka.consumer({ groupId: "payment-service" });
const producer = kafka.producer();

async function start() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value!.toString());
      console.log("Payment Service processing order:", order);

      // Simulate payment result
      const payment = { orderId: order.orderId, status: "success" };
      await producer.send({
        topic: "payments",
        messages: [{ value: JSON.stringify(payment) }],
      });
      console.log("Payment processed:", payment);
    },
  });
}

start().catch(console.error);
