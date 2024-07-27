export const OneTimePass = () => {
	const otp = Math.floor(Math.random(1000) * 9 * 1000);
	return otp;
};
