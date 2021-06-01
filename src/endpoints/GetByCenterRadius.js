import Axios from '../utils/Axios';
import qs from 'qs';

const GetByCenterRadius = async (lat, lng, dist) => {
	// let coord = [];
	// coord.push(lng, lat, dist);
	// console.log(coord);
	const { data } = await Axios.get(
		`${process.env.REACT_APP_BACKEND_URL}/location/store`,
		{
			params: { lat, lng, dist },
			// paramsSerializer: (params) => qs.stringify(params),
		}
	);
	return data;
};
export default GetByCenterRadius;
