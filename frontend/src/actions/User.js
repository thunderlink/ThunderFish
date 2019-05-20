export const SIGNUP_REQUEST = "SIGNUP_REQUEST"
export const SIGNUP_SUCCESSFUL = "SIGNUP_SUCCESFUL"
export const SIGNUP_FAILED = "SIGNUP_FAILED"
export const SIGNUP_DONE = "SIGNUP_DONE"

export const SIGNIN_REQUEST = "SIGNIN_REQUEST"
export const SIGNIN = "SIGNIN"
export const SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL"
export const SIGNIN_AUTH_ERR = "SIGNIN_AUTH_ERR"
export const SIGNIN_FAILED = "SIGNIN_FAILED"


// THIS IS END OF CONST

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



/*
FOR USER DETAIL

First, we need to complete user detail componenet.
Then, we may make state just in component, or we can make separate REDUCER and implement state there.

 */
export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST"
export const PUT_PROFILE_REQUEST = "PUT_PROFILE_REQUEST"
export const GET_PROFILE = "GET_PROFILE"
export const PUT_PROFILE = "PUT_PROFILE"

export const getProfileRequest = (index, token) => {
	return {
		type: 'GET_PROFILE_REQUEST',
		index: index,
		token : token
	}
}


