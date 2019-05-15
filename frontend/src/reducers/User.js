const initialState = {
	token: null, //holds the user token.
	username: null, //holds the name of user.
	isAuthenticated: false, //check if signed-in or not.
}

export default function user(state=initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

