import sql from "../config/mysql.js";

export const otpSave = (otp, user_id, user_email) => {
	const storeQuery = `INSERT INTO otps(user_id,user_email,otp) VALUE("${user_id}","${user_email}","${otp}")`;

	return new Promise((resolve, reject) => {
		sql(storeQuery)
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};
