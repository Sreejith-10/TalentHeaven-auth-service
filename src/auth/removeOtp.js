import sql from "../config/mysql.js";

export const removeOtp = (uid) => {
	return new Promise((resolve, reject) => {
		sql(`DELETE FROM otps WHERE user_id = '${uid}'`);
	})
		.then((result) => resolve(result))
		.catch((err) => reject(err));
};
