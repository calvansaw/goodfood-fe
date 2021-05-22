import Axios from '../utils/Axios';

const signOut = async () => {
	try {
		const { data } = await Axios.delete(
			`${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
			{
				refreshToken: localStorage.getItem('refresh'),
			}
		);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export default signOut;
