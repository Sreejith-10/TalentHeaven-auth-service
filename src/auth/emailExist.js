import sql from "../config/mysql.js";

export const emailExist = (email) => {
	const emailExistQuery = `SELECT * FROM users WHERE email = '${email}'`;

	return new Promise((resolve, reject) => {
		sql(emailExistQuery)
			.then((res) => {
				resolve(res[0]);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
