import Axios from '../utils/Axios';

const SignIn = async (username, password) => {
	try {
		const { data } = await Axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/auth/login`,
			{
				username,
				password,
			}
		);
		console.log(data);
		const jsonData = JSON.stringify(data.user);
		localStorage.setItem('access', data.accessToken);
		localStorage.setItem('refresh', data.refreshToken);
		localStorage.setItem('user', jsonData);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export default SignIn;
