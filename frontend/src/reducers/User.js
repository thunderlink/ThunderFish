const initialState = {
	token: localStorage.getItem("token"), //holds the user token.
	id: -1,
	nickname: null, //holds the name of user.
	isAuthenticated: false, //check if signed-in or not.
	signupStatus: 'NONE', //check if signup has successed or not.
}

export default function user(state=initialState, action) {
	switch (action.type) {
		case 'SIGNUP_SUCCESSFUL': 
			return Object.assign({}, state, {
				signupStatus: 'SUCCESS', 
				nickname: action.user.nickname, 
			})

		case 'SIGNUP_DUPLICATED':
			return Object.assign({}, state, {
				signupStatus: 'DUPLICATED'
			})

		case 'SIGNUP_FAILED':
		case 'SIGNUP_DONE':
			return Object.assign({}, state, {
				signupStatus: 'NONE', 
				nickname: null
			})

		case 'SIGNIN_SUCCESSFUL':
			localStorage.setItem("token", action.token);
			return Object.assign({}, state, {
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

		case 'SIGNOUT':
			localStorage.removeItem("token")
			return Object.assign({}, state, {
				token: null,
				id: -1,
				nickname: null,
				isAuthenticated: false,
			})

		default:
			return state;
	}
}

