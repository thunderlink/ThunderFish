const initialState = {
	commentList: [], //comment lists
}

export default function comment(state=initialState, action) {
	switch (action.type) {
		case "GET_COMMENT:
			return{
				commentList : action.comments
			};
		case "POST_COMMENT":
			return{
				...state,
				commentList : [...state.commentList , action.comment]
			};
		case "PUT_COMMENT":
			return{
				...state,
				commentList : state.commentList.map(
					(item) => item.id === action.index ? comment : item
				)
			};
		case "DELETE_COMMENT":
			return{
				...state,
				commentList : state.commentList.filter(
					(item) => item.id !== action.index)
			};
		default:
			return state;
	}
}
