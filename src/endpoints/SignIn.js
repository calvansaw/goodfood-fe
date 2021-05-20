import Axios from '../utils/Axios';

Axios.defaults.withCredentials = true;

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
	} catch (err) {
		console.log(err);
	}
};

export default signIn;
