import sql from "../config/mysql.js";

export const registerUser = (id, name, email, password) => {
	const registerUserQuery = `INSERT INTO users VALUE("${id}","${name}","${email}","${password}")`;

	return new Promise((resolve, reject) => {
		sql(registerUserQuery)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
