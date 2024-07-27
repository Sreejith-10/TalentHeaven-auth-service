import {login} from "../auth/login.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {nanoid} from "nanoid";
import {emailExist} from "../auth/emailExist.js";
import sql from "../config/mysql.js";
import {log} from "../utils/log.js";
dotenv.config();

export const loginUser = async (req, res) => {
	const {email, password} = req.body;

	const userExist = await emailExist(email);
	if (!userExist) {
		return res.status(400).json({message: "user does not exist"});
	}

	const user = await login(email, password);

	bcrypt.compare(password, user.password, async (err, data) => {
		if (err) {
			return res
				.status(500)
				.json({message: "something went wrong", error: err});
		}

		if (!data) {
			return res.status(400).json({message: "incorrect password"});
		}
		try {
			const access_token = jwt.sign(
				{id: user.user_id, email: user.email, name: user.name},
				process.env.JWT_SECRET,
				{expiresIn: "12h"}
			);

			const session_id = nanoid(10);
			const refresh_token = jwt.sign(
				{id: user.user_id, email: user.email, name: user.name},
				process.env.JWT_SECRET,
				{expiresIn: "5d"}
			);

			await sql(`DELETE FROM auth WHERE user_id = '${user.user_id}'`);

			await sql(
				`INSERT INTO auth (session_id,refresh_token,user_id) VALUES ('${session_id}','${refresh_token}','${user.user_id}')`
			);

			return res
				.cookie("access_token", access_token, {maxAge: 1000 * 60 * 60 * 10})
				.cookie("session_id", session_id, {maxAge: 1000 * 60 * 60 * 24 * 5})
				.status(200)
				.json({
					message: "login success",
					token: access_token,
					session_id: session_id,
					user,
				});
		} catch (error) {
			log(error);
			return res.status(500).json({message: "something went wrong", error});
		}
	});
};
