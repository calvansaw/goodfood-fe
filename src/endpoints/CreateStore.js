import Axios from '../utils/Axios';

const CreateStore = async (storeName, storeDesc, storeImg, username) => {
	try {
		const { data } = await Axios.post(
			`${process.env.REACT_APP_BACKEND_URL}/food`,
			{
				storeName,
				storeDesc,
				storeImg,
				username,
			}
		);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export default CreateStore;
