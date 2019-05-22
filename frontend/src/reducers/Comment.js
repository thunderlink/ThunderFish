/*const initialState = {
	commentList: [], //comment lists
}
*/

import initialState from './Meeting'

export default function comment(state=initialState, action) {
	switch (action.type) {
		case "GET_COMMENT":
		case "POST_COMMENT":
			return{
				...state,
				meetingElement : {
					...state.meetingElement,
					comment : [...state.meetingElement.comment, action.comment]
				}
			}

		case "PUT_COMMENT":
			return{
				...state,
				meetingElement : {
					...state.meetingElement,
					comment : state.meetingElement.comment.map(
						(item) => item.id === action.index ? comment : item
					)
				}
			}

		case "DELETE_COMMENT":
			return{
				...state,
				meetingElement : {
					...state.meetingElement,
					comment : state.meetingElement.comment.fliter(
						(item) => item.id !== action.index
					)
				}
			}
		default:
			return state;
	}
}
