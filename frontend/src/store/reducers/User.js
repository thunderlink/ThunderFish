const initialState = {
	/* Detail for current user */
	token: localStorage.getItem("token"), //holds the user token.
	id: -1,
	nickname: '', //holds the name of user.
	pic_url: '',
	isAuthenticated: false, //check if signed-in or not.
	signinStatus: 'NONE',
	signupStatus: 'NONE', //check if signup has successed or not.

	/* Detail for user view */
	user: null,
	loadDone: false,
	loadFailed: false,
	postDone: false,
	postFailed: false,
}

export default function user(state=initialState, action) {
	switch (action.type) {
		case 'WAIT_REQUEST' :
			return {
				...state,
				loadDone: false,
				postDone: false,
				loadFailed: false,
				postFailed: false,
			}

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

		case 'SIGNIN_TRY': 
			return {
				...state,
				signinStatus: 'WAIT'
			}

		case 'SIGNIN_SUCCESSFUL':
			localStorage.setItem("token", action.token);
			return Object.assign({}, state, {
				id: action.id,
				signinStatus: 'SUCCESS',
				nickname: action.nickname,
				isAuthenticated: true
			})

		case 'SIGNIN_AUTH_ERR':
		case 'SIGNIN_FAILED':
			return Object.assign({}, state, {
				token: null,
				id: -1,
				signinStatus: 'FAILED',
				nickname: null,
				isAuthenticated: false
			})

		case 'SIGNOUT':
			localStorage.removeItem("token")
			return Object.assign({}, state, {
				token: null,
				id: -1,
				signinStatus: 'NONE',
				nickname: null,
				isAuthenticated: false,
			})

		case 'USER_SET_SUCCESSFUL':
			return {
				...state,
				token: action.token,
				id: action.id,
				pic_url: action.pic_url,
				nickname: action.nickname,
				isAuthenticated: true
			}

		case 'USER_SET_NONE':
		case 'USER_SET_FAILED':
			return {
				...state,
				token: null,
				id: -1,
				pic_url: '',
				nickname: null,
				isAuthenticated: false
			}

		case 'GET_USER':
			return Object.assign({}, state, {
				user: action.data,
				loadDone: true,
				loadFailed: false,
			})

		case 'PUT_USER':
			return {
				...state,
				postDone: true,
				postFailed: false,
			}

		case 'USER_REQUEST_FAILURE':
			switch(action.code) {
				case 'PUT_USER':
					return {
						...state,
						postDone: true,
						postFailed: true
					}
				case 'GET_USER':
					return {
						...state,
						loadDone: true,
						loadFailed: true
					}
				default:
					return state;
			}

		default:
			return state;
	}
}

