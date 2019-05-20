export const SIGNUP_REQUEST = "SIGNUP_REQUEST"
export const SIGNUP_SUCCESSFUL = "SIGNUP_SUCCESFUL"
export const SIGNUP_FAILED = "SIGNUP_FAILED"
export const SIGNUP_DONE = "SIGNUP_DONE"

export const SIGNIN_REQUEST = "SIGNIN_REQUEST"
export const SIGNIN = "SIGNIN"
export const SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL"
export const SIGNIN_AUTH_ERR = "SIGNIN_AUTH_ERR"
export const SIGNIN_FAILED = "SIGNIN_FAILED"

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
		token: token
	}
}




