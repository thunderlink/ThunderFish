export const SIGNUP_REQUEST = "SIGNUP_REQUEST"
export const SIGNUP_SUCCESSFUL = "SIGNUP_SUCCESSFUL"
export const SIGNUP_DUPLICATED = "SIGNUP_DUPLICATED"
export const SIGNUP_FAILED = "SIGNUP_FAILED"
export const SIGNUP_DONE = "SIGNUP_DONE"

export const SIGNIN_REQUEST = "SIGNIN_REQUEST"
export const SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL"
export const SIGNIN_AUTH_ERR = "SIGNIN_AUTH_ERR"
export const SIGNIN_FAILED = "SIGNIN_FAILED"

export const SIGNOUT = "SIGNOUT"

export const USER_SET_REQUEST = "USER_SET_REQUEST"
export const USER_SET_SUCCESSFUL = "USER_SET_SUCCESSFUL"
export const USER_SET_NONE = "USER_SET_NONE"
export const USER_SET_FAILED = "USER_SET_FAILED"

export const KAKAO_LOGIN_REQUEST = "KAKAO_LOGIN_REQUEST"

export const kakaologinRequest = (object) => {
	return {
		type: 'KAKAO_LOGIN_REQUEST',
		object: object
	}
}

export const signupRequest = (user) => {
	return {
		type: 'SIGNUP_REQUEST',
		user: user
	}
}

export const signupDone = () => {
	return {
		type: 'SIGNUP_DONE'
	}
}

export const signinRequest = (username, password) => {
	return {
		type: 'SIGNIN_REQUEST',
		username: username,
		password: password
	}
}

export const signinSuccessful = (username, token) => {
	return {
		type: 'SIGNIN_SUCCESSFUL',
		username: username,
		token : token
	}
}

export const signout = () => {
	return {
		type: 'SIGNOUT',
	}
}

export const userSetRequest = () => {
	return {
		type: 'USER_SET_REQUEST'
	}
}

/* FOR USER DETAIL */
export const WAIT_REQUEST = "WAIT_REQUEST"
export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const PUT_USER_REQUEST = "PUT_USER_REQUEST"
export const GET_USER = "GET_USER"
export const PUT_USER = "PUT_USER"
export const USER_REQUEST_FAILURE = "USER_REQUEST_FAILURE"

export const waitRequest = () => {
	return {
		type: 'WAIT_REQUEST'
	}
}

export const getUserRequest = (index) => {
	return {
		type: 'GET_USER_REQUEST',
		index: index
	}
}

export const putUserRequest = (index, profile) => {
	return {
		type: 'PUT_USER_REQUEST',
		index: index,
		profile: profile,
	}
}
