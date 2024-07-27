import {emailExist} from "../auth/emailExist.js";
import bcrypt from "bcrypt";
import {nanoid} from "nanoid";
import {validateEmail} from "../utils/emailRegex.js";
import {registerUser} from "../auth/register.js";

export const createUser = async (req, res) => {
	const {name, email, password} = req.body;

	const isExist = await emailExist(email);

	if (!name || !email || !password) {
		return res.status(401).json({message: "provide proper data"});
	}
	if (isExist) {
		return res.status(400).json({message: "email already exist"});
	}

	if (!validateEmail(email)) {
		return res.status(400).json({message: "provide a valid email"});
	}

	const hashed = await bcrypt.hash(password, 12);
	const id = nanoid(20);

	registerUser(id, name, email, hashed)
		.then(() => {
			return res.status(202).json({message: "User created"});
		})
		.catch((err) => {
			rejeect(err);
		});
};
