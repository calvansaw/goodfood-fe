export const LocationReducer = (state, action) => {
	switch (action.type) {
		case 'INIT': {
			console.log(action.data);
			return {
				...state,
				lat: action.data.lat,
				lng: action.data.lng,
			};
		}
		case 'SHIFT': {
			console.log(action.data);
			return {
				...state,
				lat: action.data.lat,
				lng: action.data.lng,
				markerPosn: action.data.markerPosn,
			};
		}

		// case 'LOGOUT':
		// 	return { ...state, isAuth: false, user: null };

		// case 'REGISTER': {
		// 	console.log(action.data);
		// 	return { ...state, isAuth: true, user: action.data.user };
		// }

		default:
			return state;
	}
};
