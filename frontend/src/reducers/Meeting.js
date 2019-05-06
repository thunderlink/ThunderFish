const initialState = {
	meetingList: [],
	searchText: "",
	searchOption: {},
}

export default function meeting(state=initialState, action) {
	switch (action.type) {
		case "ADD_MEETING":
			return state;
		case "EDIT_MEETING":
			return state;
		case "DELETE_MEETING":
			return state;
		case "SEARCH_MEETING":
			return state;
		default:
			return state;
	}
}
