export const SEARCH = "SEARCH"

export const GET_MEETING_REQUEST = "GET_MEETING_REQUEST"
export const POST_MEETING_REQUEST = "POST_MEETING_REQUEST"
export const PUT_MEETING_REQUEST = "PUT_MEETING_REQUEST"
export const DELETE_MEETING_REQUEST = "DELETE_MEETING_REQUEST"
export const GET_MEETING = "GET_MEETING"
export const POST_MEETING = "POST_MEETING"
export const PUT_MEETING = "PUT_MEETING"
export const DELETE_MEETING= "DELETE_MEETING"

export const JOIN_MEETING_REQUEST = "JOIN_MEETING_REQUEST"
export const JOIN_MEETING = "JOIN_MEETING"

export const ADD_MEETING = "ADD_MEETING"
export const EDIT_MEETING = "EDIT_MEETING"
export const DELETE_MEETING = "DELETE_MEETING"
export const SEARCH_MEETING = "SEARCH_METING"

export const addMeeting = (meeting) => {
	return {
		type: "ADD_MEETING",
		meeting
	}
}

export const editMeeting = (index, meeting) => {
	return {
		type: "EDIT_MEETING",
		index,
		meeting
	}
}

export const deleteMeeting = (index) => {
	return {
		type: "DELETE_MEETING",
		index
	}
}

export const searchMeeting = (query) => {
	return {
		type: "SEARCH_MEETING",
		query
	}
}

