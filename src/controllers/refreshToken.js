import {refresh} from "../auth/refresh.js";
import {log} from "../utils/log.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const refreshToken = async (req, res) => {
	try {
		const {id} = req.params;

		const refresh_data = await refresh(id);

		if (!refresh_data) {
			return res.status(404).json({message: "please login"});
		}

		jwt.verify(
			refresh_data.refresh_token,
			process.env.JWT_SECRET,
			(err, data) => {
				if (err && err.message === "jwt expired") {
					return res
						.status(401)
						.json({message: "session not authenticated", error: err});
				}

				if (data) {
					const access_token = jwt.sign(
						{id: data.id, email: data.email},
						process.env.JWT_SECRET,
						{expiresIn: 1000 * 30}
					);

					return res
						.cookie("access_token", access_token, {maxAge: 1000 * 60 * 60 * 10})
						.status(200)
						.json({
							message: "login success",
							token: access_token,
							session_id: refresh_data.session_id,
							data,
						});
				}
			}
		);
	} catch (error) {
		return res.status(500).json({message: "something went wrong"});
	}
};
