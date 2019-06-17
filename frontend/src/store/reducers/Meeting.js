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
	participant_waiting : {},
	region: '',
	comments: []
}

export const initialState = {
	meetingList: [],	
	meetingElement: emptyMeeting,
	searchText: '',	
	searchOption: {},

	loadDone: false,
	loadFailed: false,
	postDone: false,
	postFailed: false,
	requestError: '',
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

		case "GET_MEETING_LIST":
			return{
				...state,
				loadDone: true,
				loadFailed: false,				
				meetingList: action.meetings,
			}

		case "GET_RECENT_MEETING":
			return {
				...state,
				meetingList: action.meetings,
				loadDone: true,
				loadFailed: false,
			}

		case "MEETING_REQUEST_FAILURE":
			alert(`에러가 발생했습니다. 관리자에게 문의해주세요. (ERR=${action.code})`);
			return {
				...state,
				loadDone: true,
				postDone: true,
				loadFailed: true,
				postFailed: true,
				requestError: action.code,
			}

		default:
			return state;
	}
}
