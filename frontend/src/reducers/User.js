const initialState = {
	token: null, //holds the user token.
	username: null, //holds the name of user.
	isAuthenticated: false, //check if signed-in or not.
	signupSuccess: false, //check if signup has successed or not.
}

export default function user(state=initialState, action) {
	switch (action.type) {
		case 'SIGNUP_SUCCESSFUL': 
			return {signupSuccess: true, username: action.user.nickname, ...state}

		case 'SIGNUP_FAILED':
		case 'SIGNUP_DONE':
			return {signupSuccess: false, username: null, ...state}

		case 'SIGNIN_SUCCESSFUL':
			return {
				isAuthenticated: true, 
				token: action.token, 
				username: action.username, 
				...state}

		case 'SIGNIN_AUTH_ERR':
		case 'SIGNIN_FAILED':
			return {
				isAuthenticatd: false,
				token: null,
				username: null,
				...state}

		default:
			return state;
	}
}

