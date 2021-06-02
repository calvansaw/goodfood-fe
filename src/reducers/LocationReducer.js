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

		default:
			return state;
	}
};
