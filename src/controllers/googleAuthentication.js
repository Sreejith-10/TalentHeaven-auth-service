import { nanoid } from "nanoid";
import { google } from "../auth/google.js";
import sql from "../config/mysql.js";

export const googleAuthentication = async (req, res) => {

  const userData = req.user.profile._json

  try {
    const user = await google(userData.email)

    if (user) {
      const access_token = jwt.sign(
        { id: user.user_id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      const session_id = nanoid(10);
      const refresh_token = jwt.sign(
        { id: user.user_id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      await sql(`DELETE FROM auth WHERE user_id = '${id}'`);

      await sql(
        `INSERT INTO auth (session_id,refresh_token,user_id) VALUES ('${session_id}','${refresh_token}','${id}')`
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
    } else {
      const id = nanoid(20)
      const createUserQuery = `INSERT INTO users VALUE("${id}","${userData.name}","${userData.email}","${userData.sub}")`;
      await sql(createUserQuery)

      const access_token = jwt.sign(
        { id, email: userData.email, name: userData.name },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      );

      const session_id = nanoid(10);
      const refresh_token = jwt.sign(
        { id, email: userData.email, name: userData.name },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      await sql(`DELETE FROM auth WHERE user_id = '${id}'`);

      await sql(
        `INSERT INTO auth (session_id,refresh_token,user_id) VALUES ('${session_id}','${refresh_token}','${id}')`
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
    }
  } catch (err) {
    return res.status(500).json({ message: "something went wrong" })
  }
}  
