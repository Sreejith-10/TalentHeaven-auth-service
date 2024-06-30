import sql from "../config/mysql.js";

export const refresh = (id) => {
	const accessRefresh = `SELECT * FROM auth WHERE session_id = '${id}'`;

	return new Promise((resolve, reject) => {
		sql(accessRefresh)
			.then((res) => resolve(res[0]))
			.catch((err) => reject(err));
	});
};
