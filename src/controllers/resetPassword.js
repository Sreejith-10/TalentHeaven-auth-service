import bcrypt from "bcrypt";
import sql from "../config/mysql.js";
import {removeOtp} from "../auth/removeOtp.js";

export const resetPassword = async (req, res) => {
	const {newPassword, id} = req.body;

	const user = await sql(`SELECT * FROM users WHERE user_id = '${id}'`);

	bcrypt.compare(newPassword, user[0].password, async (err, same) => {
		if (same) {
			return res.status(304).json({
				message: "password is same as previous provide a new password",
				err,
			});
		}

		const hashed = await bcrypt.hash(newPassword, 12);
		sql(`UPDATE users SET password='${hashed}' WHERE user_id='${id}'`)
			.then(() => {
				return res.status(200).json({message: "credentials updates"});
			})
			.catch((err) => {
				return res
					.status(500)
					.json({message: "something went wrong", error: err});
			});
	});
};
