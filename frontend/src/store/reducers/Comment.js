export default function comment(state=null, action) {
	switch (action.type) {
		case "GET_COMMENT":
		case "POST_COMMENT":
		case "PUT_COMMENT":
		case "DELETE_COMMENT":
		default:
			return state;
	}
}
