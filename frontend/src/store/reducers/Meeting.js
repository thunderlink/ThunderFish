/* These are only for check the view. 
 * Will be deleted after backend done.
 */
import '../actions/Meeting'

const emptyMeeting = {
	photo: null,
	nickname: '',
	host: -1,
	content: '',
	tag_set: {},
	status: 0,
	date: '',
	deadline: '',
	max_participant: 0,
	region: '',
	comments: []
}

export const initialState = {
	meetingList: [],	
	meetingElement: emptyMeeting,
	searchText: "",	
	searchOption: {},

	loadDone: false,
	loadFailed: false,
	postDone: false,
	postFailed: false,
	requestError: 0,
}

export default function meeting(state=initialState, action) {
	switch (action.type) {
     
		case "WAIT_REQUEST":
			return{
				...state,
				postDone: false,
				loadDone: false,
			}

		case "GET_MEETING":
			return{
				...state,
				loadDone : true,
				loadFailed: false,
				meetingElement : action.meeting
			}

		case "POST_MEETING":
			return{
				...state,
				postDone : true,
				postFailed: false,
				meetingElement : action.meeting
			}

		case "PUT_MEETING":
			return{
				...state,
				postDone: true,
				postFailed: false,
				meetingElement: action.meeting
			}

		case "DELETE_MEETING":
			return{
				...state,
			}

		case "GET_MEETING_LIST":
			return{
				...state,
				loadDone: true,
				loadFailed: false,				
				meetingList: action.meetings,
			}

		case "GET_RECENT_MEETING":
			if(action.index === 1) {
				return {
					...state,
					meetingList: action.meetings,
					loadDone: true,
					loadFailed: false,
				}
			}
			else {
				return {
					...state,
					meetingList: state.meetingList.concat(action.meetings),
					loadDone: true,
					loadFailed: false,
				}
			}

		case "MEETING_REQUEST_FAILURE":
			return {
				...state,
				loadDone: true,
				postDone: true,
				loadFailed: true,
				postFailed: true,
			}

		case "JOIN_MEETING":
			return state;
		case "ACCEPT_MEETING":
			return state;

		default:
			return state;
	}
}
