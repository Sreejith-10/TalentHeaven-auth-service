import { emailExist } from "../auth/emailExist.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { validateEmail } from "../utils/emailRegex.js";
import { registerUser } from "../auth/register.js";
import jwt from "jsonwebtoken";
import sql from "../config/mysql.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await emailExist(email);

  if (!name || !email || !password) {
    return res.status(401).json({ message: "provide proper data" });
  }
  if (isExist) {
    return res.status(400).json({ message: "email already exist" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "provide a valid email" });
  }

  const hashed = await bcrypt.hash(password, 12);
  const id = nanoid(20);

  registerUser(id, name, email, hashed)
    .then(() => {
      return res.status(202).json({ message: "User created" });
    })
    .catch((err) => {
      rejeect(err);
    });

  try {
    const access_token = jwt.sign(
      { id: user.user_id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
    );

    const session_id = nanoid(10);
    const refresh_token = jwt.sign(
      { id: user.user_id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "5d" },
    );

    await sql(
      `INSERT INTO auth (session_id,refresh_token,user_id) VALUES ('${session_id}','${refresh_token}','${id}')`,
    );

    return res
      .cookie("access_token", access_token, { maxAge: 1000 * 60 * 60 * 10 })
      .cookie("session_id", session_id, { maxAge: 1000 * 60 * 60 * 24 * 5 })
      .status(200)
      .json({
        message: "login success",
        token: access_token,
        session_id: session_id,
        user,
      });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
