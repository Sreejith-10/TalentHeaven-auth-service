import sql from "../config/mysql.js";

export const verifyOtp = async (req, res) => {
	const {otp, email} = req.body;

	const otpData = await sql(
		`SELECT * FROM otps WHERE user_email =  '${email}'`
	);

	if (otp === otpData[0].otp) {
		await sql(`DELETE FROM otps WHERE user_email =  '${email}'`);

		return res
			.status(200)
			.json({message: "otp matched", id: otpData[0].user_id});
	} else {
		return res.status(400).json({message: "Invalid otp"});
	}
};
