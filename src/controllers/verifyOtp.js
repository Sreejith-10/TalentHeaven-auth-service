import {removeOtp} from "../auth/removeOtp.js";
import sql from "../config/mysql.js";

export const verifyOtp = async (req, res) => {
	const {otp, id} = req.body;

	const otpData = await sql(`SELECT * FROM otps WHERE user_id =  '${id}'`);

	if (otp === otpData[0].otp) {
		return res
			.status(200)
			.json({message: "otp matched", id: otpData[0].user_id});
	} else {
		return res.status(404).json({message: "Invalid otp"});
	}
};
// 	await removeOtp(id);
