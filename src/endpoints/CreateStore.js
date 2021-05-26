import Axios from '../utils/Axios';

const CreateStore = async (payload) => {
	try {
		const { data } = await Axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/food`,
			payload
		);
		console.log(data);
		return data;
	} catch (err) {
		throw new Error('Create store failed!');
	}
};

export default CreateStore;
