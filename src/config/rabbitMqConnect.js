import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const queue = "auth_service_queue";
let channel = null

const createConnectionMQ = async () => {
  try {
    const connection = amqp.connect(process.env.AMQP_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(queue, "direct", { durable: true });
  }
  catch (err) {
    throw new Error(err)
  }
};

const sendToQueue = async (targetQueue, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = null;
      const uuid = crypto.randomUUID()

      await channel.sendToQueue(targetQueue, Buffer.from(data), {
        replyTo: queue,
        correlationId: uuid
      })

      await channel.consume(queue, msg => {
        if (msg.properties.correlationId === uuid) {
          response = msg.content.toString()
        }
      }, { noAck: true })

      resolve(response)
    } catch (err) {
      reject(err)
    }
  })
};

export { createConnectionMQ, sendToQueue }
