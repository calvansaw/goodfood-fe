import Axios from '../utils/Axios';

const signIn = async (username, password) => {
	try {
		const { data } = await Axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/auth/login`,
			{
				username,
				password,
			}
		);
		console.log(data);
		localStorage.setItem('access', data.accessToken);
		localStorage.setItem('refresh', data.refreshToken);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export default signIn;
