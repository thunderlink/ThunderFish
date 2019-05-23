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

export const REQUEST_FAILURE = "REQUEST_FAILURE"

/* Actions for testing without backend.
 * It will only make effects on the frontend status,
 * without the backend API.
 * It will be not used after backend prepared.
 */
export const SHOW_MEETING = "SHOW_MEETING" //get one meeting by its id. Will not be used when backend API prepared.
export const ADD_MEETING = "ADD_MEETING"
export const EDIT_MEETING = "EDIT_MEETING"
export const REMOVE_MEETING = "REMOVE_MEETING"

/******************** END OF CONSTANTS *********************/

export const waitRequest = () => {
	return {
		type: "WAIT_REQUEST"
	}
}


export const getMeetingRequest = (index) => {
	console.log(index)
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

export const putMeetingRequest = (meeting, token) => {
    return {
        type: "PUT_MEETING_REQUEST",
        meeting,
        token
    }
}

export const deleteMeetingRequest = (index) => {
    return {
        type: "DELETE_MEETING_REQUEST",
        index
    }
}

export const getMeeting = (meeting) => {
    return {
        type: "GET_MEETING",
        meeting
    }
}

export const postMeeting = (meeting) => {
    return {
        type: "POST_MEETING",
        meeting
    }
}

export const putMeeting = (meeting, index) => {
    return {
        type: "PUT_MEETING",
        meeting,
        index
    }
}

export const deleteMeeting = (index) => {
    return {
        type: "DELETE_MEETING",
        index
    }
}

export const getMeetingListRequest = (query, token) => {
    return {
        type: "GET_MEETING_LIST_REQUEST",
        query,
        token
    }
}

export const getMeetingList = (meetings) => {
    return {
        type: "GET_MEETING_LIST",
        meetings
    }
}

export const joinMeetingRequest = (index, user, token) => {
    return {
        type: "JOIN_MEETING_REQUEST",
        index,
        user,
        token
    }
}

export const joinMeeting = (index, user) => {
    return {
        type: "JOIN_MEETING",
        index,
        user
    }
}

export const acceptMeetingRequest = (index, user) => {
    return {
        type: "ACCEPT_MEETING_REQUEST",
        index,
        user
    }
}

export const acceptMeeting = (index, user) => {
    return {
        type: "ACCEPT_MEETING",
        index,
        user
    }
}

export const requestFailure = (/**/) => {
    return {
        type: "REQUEST_FAILURE"
    }
}

/*

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

export const removeMeeting = (index) => {
	return {
		type: "REMOVE_MEETING",
		index
	}
}

export const showMeeting = (id) => {
	return {
		type: "SHOW_MEETING",
		id
	}
}*/
