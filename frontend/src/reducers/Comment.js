/*const initialState = {
	commentList: [], //comment lists
}
*/

import initialState from './Meeting'

export default function comment(state=initialState, action) {
	switch (action.type) {
		case "GET_COMMENT":
		case "POST_COMMENT":
		case "PUT_COMMENT":
		case "DELETE_COMMENT":
		default:
			return state;
	}
}
