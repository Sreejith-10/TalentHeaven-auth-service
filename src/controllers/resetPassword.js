import bcrypt from "bcrypt";
import sql from "../config/mysql.js";

export const resetPassword = async (req, res) => {
	const {newPassword, id} = req.body;

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
};
