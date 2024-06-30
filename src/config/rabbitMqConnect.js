import amqp from "amqplib/callback_api.js";
import dotenv from "dotenv";

dotenv.config();

let queue = "job_service_queue";
let channel = null;

export const createConnectionMQ = () => {
	amqp.connect(process.env.AMQP_URL, async (err0, connection) => {
		if (err0) {
			throw err0;
		}
		channel = await connection.createChannel();
		await channel.assertExchange(queue, "direct", {durable: false});
	});
};

export const sendToQueue = async (key, data) => {
	let msg = JSON.stringify(data);
	channel.publish(queue, key, Buffer.from(msg));
	console.log(`Sent : ${data} to queue:${queue}`);
};
