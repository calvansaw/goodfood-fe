import Axios from '../utils/Axios';

const register = async (username, password, userType) => {
	try {
		const { data } = await Axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
			{
				username,
				password,
				userType,
			}
		);
		console.log(data);
		localStorage.setItem('access', data.accessToken);
		localStorage.setItem('refresh', data.refreshToken);
	} catch (err) {
		console.log(err);
	}
};

export default register;