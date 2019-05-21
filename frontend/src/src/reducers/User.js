const initialState = {
	token: null, //holds the user token.
	id: -1,
	nickname: null, //holds the name of user.
	isAuthenticated: false, //check if signed-in or not.
	signupSuccess: false, //check if signup has successed or not.
}

export default function user(state=initialState, action) {
	switch (action.type) {
		case 'SIGNUP_SUCCESSFUL': 
			return Object.assign({}, state, {
				signupSuccess: true, 
				nickname: action.user.nickname, 
			})

		case 'SIGNUP_FAILED':
		case 'SIGNUP_DONE':
			return Object.assign({}, state, {
				signupSuccess: false, 
				nickname: null
			})

		case 'SIGNIN_SUCCESSFUL':
			return Object.assign({}, state, {
				token: action.token,
				id: action.id,
				nickname: action.nickname,
				isAuthenticated: true
			})

		case 'SIGNIN_AUTH_ERR':
		case 'SIGNIN_FAILED':
			return Object.assign({}, state, {
				token: null,
				id: -1,
				nickname: null,
				isAuthenticated: false
			})

		default:
			return state;
	}
}

