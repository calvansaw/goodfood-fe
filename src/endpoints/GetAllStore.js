import Axios from '../utils/Axios';

const GetAllStore = async () => {
	try {
		const { data } = await Axios.get(
			`${process.env.REACT_APP_BACKEND_URL}/food`
		);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export default GetAllStore;
