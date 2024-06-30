import {sessionVerification} from "../auth/session.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = async (req, res) => {
	const {id} = req.params;

	const session = await sessionVerification(id);

	if (session) {
		jwt.verify(session.refresh_token, process.env.JWT_SECRET, (err, data) => {
			if (err && err.message === "jwt expired") {
				return res.status(401).json({message: "session timeout"});
			} else {
				const access_token = jwt.sign(
					{id: user.user_id, email: user.email},
					process.env.JWT_SECRET,
					{expiresIn: "10h"}
				);

				return res
					.cookie("access_token", access_token, {maxAge: 1000 * 60 * 60 * 5})
					.status(200)
					.json({
						message: "login success",
						token: access_token,
						session_id: session.session_id,
					});
			}
		});
	} else {
		return res.status(401).json({message: "session timeout"});
	}
};
