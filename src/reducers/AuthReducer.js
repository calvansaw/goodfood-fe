export const AuthReducer = (state, action) => {
	console.log(state);
	switch (action.type) {
		case 'LOGIN':
			return { ...state, isAuth: true, user: action.data };

		case 'LOGOUT':
			return { ...state, isAuth: false, user: null };

		case 'REGISTER':
			return { ...state, isAuth: true, user: action.data };

		default:
			return state;
	}
};
