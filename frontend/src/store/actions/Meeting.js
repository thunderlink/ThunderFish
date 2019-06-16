/* *_REQUEST actions will be called by components and
 * call the main action. And then, the main action will
 * do the real jobs.


/********************* CONSTANTS ******************************/

export const WAIT_REQUEST = "WAIT_REQUEST"
/* Actions for single meeting requests.
 */
export const GET_MEETING_REQUEST = "GET_MEETING_REQUEST"
export const POST_MEETING_REQUEST = "POST_MEETING_REQUEST"
export const PUT_MEETING_REQUEST = "PUT_MEETING_REQUEST"
export const DELETE_MEETING_REQUEST = "DELETE_MEETING_REQUEST"
export const GET_MEETING = "GET_MEETING"
export const POST_MEETING = "POST_MEETING"
export const PUT_MEETING = "PUT_MEETING"
export const DELETE_MEETING= "DELETE_MEETING"

/* Actions for multiple meeting request.
 * It will be called when user searches anything.
 * It will sends the query and option to the backend,
 * and gets the list of the correct meetings.
 */
export const GET_MEETING_LIST_REQUEST = "GET_MEETING_LIST_REQUEST"
export const GET_MEETING_LIST = "GET_MEETING_LIST"
export const GET_RECENT_MEETING_REQUEST = "GET_RECENT_MEETING_REQUEST"
export const GET_RECENT_MEETING = "GET_RECENT_MEETING"

/* Actions for single meeting request, it will only
 * PUT on the meeting, 'waiter'.
 */
export const JOIN_MEETING_REQUEST = "JOIN_MEETING_REQUEST"
export const JOIN_MEETING = "JOIN_MEETING"

/* Actions for single meeting request, it will only
 * PUT on the meeting, 'waiter' and 'participant'.
 */
export const ACCEPT_MEETING_REQUEST = "ACCEPT_MEETING_REQUEST"
export const ACCEPT_MEETING = "ACCEPT_MEETING"

export const REJECT_MEETING_REQUEST = "REJECT_MEETING_REQUEST"

export const MEETING_REQUEST_FAILURE = "MEETING_REQUEST_FAILURE"

/******************** END OF CONSTANTS *********************/

export const waitRequest = () => {
	return {
		type: "WAIT_REQUEST"
	}
}


export const getMeetingRequest = (index) => {
	return {
		type: "GET_MEETING_REQUEST",
		index
	}
}

export const postMeetingRequest = (meeting) => {
	return {
		type: "POST_MEETING_REQUEST",
		meeting
	}
}

export const putMeetingRequest = (index, meeting) => {
	return {
		type: "PUT_MEETING_REQUEST",
		index,
		meeting
	}
}

export const deleteMeetingRequest = (index) => {
	return {
		type: "DELETE_MEETING_REQUEST",
		index
	}
}

export const getMeetingListRequest = (query) => {
	return {
		type: "GET_MEETING_LIST_REQUEST",
		query
	}
}

export const getRecentMeetingRequest = (index) => {
	return {
		type: "GET_RECENT_MEETING_REQUEST",
		index
	}
}

export const joinMeetingRequest = (index, user) => {
	return {
		type: "JOIN_MEETING_REQUEST",
		index,
		user,
	}
}

export const acceptMeetingRequest = (index, user) => {
	return {
		type: "ACCEPT_MEETING_REQUEST",
		index,
		user
	}
}

export const rejectMeetingRequest = (index, user) => {
	return {
		type: "REJECT_MEETING_REQUEST",
		index,
		user
	}
}

