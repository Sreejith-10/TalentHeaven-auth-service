import sql from "../config/mysql.js";

export const sessionVerification = (session_id) => {
	const sessionQuery = `SELECT * FROM auth WHERE session_id = '${session_id}'`;

	return new Promise((resolve, reject) => {
		sql(sessionQuery)
			.then((res) => resolve(res[0]))
			.catch((err) => reject(err));
	});
};
