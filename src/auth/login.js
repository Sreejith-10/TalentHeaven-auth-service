import sql from "../config/mysql.js";

export const login = (email, password) => {
	const loginQuery = `SELECT * FROM users WHERE email = '${email}'`;

	return new Promise((resolve, reject) => {
		sql(loginQuery)
			.then((res) => {
				resolve(res[0]);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
