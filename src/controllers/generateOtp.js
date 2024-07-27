import {emailExist} from "../auth/emailExist.js";
import {otpSave} from "../auth/otp.js";
import sql from "../config/mysql.js";
import {sendToQueue} from "../config/rabbitMqConnect.js";
import {OneTimePass} from "../utils/otp.js";

export const generateOtp = async (req, res) => {
	const {mail} = req.body;

	const user = await emailExist(mail);

	if (!user) {
		return res.status(400).json({message: "provide your email"});
	}

	const otp = OneTimePass();

	//store otp in db with user id and email

	await sql(`DELETE FROM otps WHERE user_id='${user.user_id}'`);

	otpSave(otp, user.user_id, user.email)
		.then(() => {
			//send to queue and then send to mail-service
			// sendToQueue("OTP", {otp: otp, mailBody: "this is a one time password"});

			return res.json({
				message: "otp send to email",
				otp,
				user_id: user.user_id,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
