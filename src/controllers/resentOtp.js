import sql from "../config/mysql.js";
import {OneTimePass} from "../utils/otp.js";

export const resentOtp = async (req, res) => {
	const {id} = req.body;

	const otp = OneTimePass();
	await sql(`UPDATE otps SET otp = '${otp}' WHERE user_id='${id}'`)
		.then((result) => {
			//send to queue and then send to mail-service
			// sendToQueue("OTP", {otp: otp, mailBody: "this is a one time password"});

			return res.status(200).json({message: "otp has resend to mail", otp});
		})
		.catch((err) => {
			return res.status(500).json({message: "something went wrong"});
		});
};
