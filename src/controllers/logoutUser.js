import sql from "../config/mysql.js";

export const logoutUser = async (req, res) => {
	const {session_id} = req.params;

	await sql(`DELETE FROM auth WHERE session_id = '${session_id}'`);

	return res.status(200).json({message: "use logged out"});
};
