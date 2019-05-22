/* These are only for check the view. 
 * Will be deleted after backend done.
 */
import '../actions/Meeting'

const meeting1 =	{
	id: 0,
	name: "컴개실 부수기",
	host: "이성찬",
	date: "2019-05-05T07:30",
	participant: ["서준원", "박종호", "김동우"],
	waiter: ["연태영", "차승빈"],
	max_participant: 17,
	deadline: "2019-05-01T12:00",
	region: "서울특별시 관악구 관악로 1 301동 314호",
	photo: "https://4.imimg.com/data4/CO/YS/MY-29352968/samsung-desktop-computer-500x500.jpg",
	content: "컴개실 파란책 1회독, 연습문제 풀이 300문제, System Programming 예습",
	status: 1,
	open_chat: "",
	tag: ["전공", "코딩", "서울대학교", "컴개실"],
	comment: [
		{id:"이성찬", text:"ㅋㅋㅋㅋㅋㅋㅋㅋㅋ"},
		{id:"서준원", text:"공부하자"},
		{id:"박종호", text:"집갈거임"}
	]
}
const meeting2 =	{
	id: 1,
	name: "러닝",
	host: "서준원",
	date: "2019-05-10T07:30",
	participant: ["이성찬", "박종호", "김동우"],
	waiter: ["이동학", "한상현"],
	max_participant: 5,
	deadline: "2019-05-08T12:00",
	region: "서울특별시 관악구 관악로 1",
	photo: "",
	content: "서울대 한바퀴 달리기",
	status: 1,
	open_chat: "",
	tag: ["스포츠", "아웃도어", "러닝", "서울대"],
	comment: [
		{writer:"이성찬", text:"소개원실 언제함"},
		{writer:"서준원", text:"오늘함"},
		{writer:"박종호", text:"ㅇㅋ"}
	]
}

/* It might used for safe meeting handling further.
 * Or, it might be deleted if we can safely handle things.
 */
const emptyMeeting = {
	id: -1,
	name: "",
	host: "",
	date: "",
	participant: [],
	waiter: [],
	max_participant: 0,
	deadline: "",
	region: "",
	photo: "",
	content: "",
	status: 0,
	open_chat: "",
	tag: [],
	comment: []
}

export const initialState = {
	meetingList: [meeting1, meeting2], //holds list of meetings; Sample data
	meetingElement: emptyMeeting, //holds one meeting
	searchText: "", //holds the search query of meeting
	searchOption: {}, //holds the search option of meeting
}

export default function meeting(state=initialState, action) {
	switch (action.type) {
		/*
		case "ADD_MEETING":
			return state;
		case "EDIT_MEETING":
			return state;
		case "DELETE_MEETING":
			return state;
		case "SEARCH_MEETING":
			return state;

		*/
		case "GET_MEETING":
			return{
				...state,
				meetingElement : action.meeting
			}
		case "POST_MEETING":
			return{
				...state,
				meetingElement : action.meeting
			};
		case "PUT_MEETING":
			return{
				...state,
				meetingElement : action.meeting
			};
		case "DELETE_MEETING":
			return{
				...state,
				meetingList : emptyMeeting
			};

		case "GET_MEETING_LIST":
			return{
				...state,
				meetingList : action.meetings
			};

			//TODO
		case "JOIN_MEETING":
			return state;
		case "ACCEPT_MEETING":
			return state;

		case "SHOW_MEETING":
			var target
			state.meetingList.map((item) => {
				if(item.id == action.id)
					target = item
				return item;
			})
			return Object.assign({}, state, {
				meetingElement: target
			})
		default:
			return state;
	}
}
