import { take, put, call, fork, select } from 'redux-saga/effects'
import api from '../services/api'
import * as actions from '../actions/index'

/*
SIGN UP
 */

const backendUrl = 'http://18.216.47.154:8000/'
const meetingUrl = `${backendUrl}meetings/`


export function* signupRequest(user) {
	const { status } = yield call(api.signup, user)
	console.log(user)
	if(status === 400) {
		yield put({type: actions.user.SIGNUP_DUPLICATED})
	}
	else if(status > 400) {
		yield put({type: actions.user.SIGNUP_FAILED})
	}
	else {
		yield put({type: actions.user.SIGNUP_SUCCESSFUL, user: user})
	}
}

export function* watchSignupRequest() {
	while(true){
		const { user } = yield take(actions.user.SIGNUP_REQUEST)
		yield call(signupRequest, user)
	}
}

/**************************
*********SIGN IN***********
 * ************************
 */

export function* signinRequest(username, password) {
	const user = {
		username: username,
		password: password
	}
	const { status, data } = yield call(api.signin, user)
	console.log(data)
	if(status === 200) {
		yield put({
			type: actions.user.SIGNIN_SUCCESSFUL, 
			token: data.token,
			nickname: data.nickname,
			id: data.id
		})
	}
	else if(status === 403 || status === 401) {
		yield put({type: actions.user.SIGNIN_AUTH_ERR})
	}
	else {
		yield put({type: actions.user.SIGNIN_FAILED})
	}
}

export function* watchSigninRequest() {
	while(true) {
		const { username, password } = yield take(actions.user.SIGNIN_REQUEST)
		yield call(signinRequest, username, password)
	}
}

export function* userSetRequest() {
	const token = yield localStorage.getItem("token")

	console.log("yeah")
	if(token == null) {
		yield put({type: actions.user.USER_SET_NONE})
	}
	else {
		const { status, id, nickname } = yield call(api.userSet, token)
		if(status >= 400) {
			yield put({type: actions.user.USER_SET_FAILED})
		}
		else {
			yield put({
				type: actions.user.USER_SET_SUCCESSFUL, 
				id: id, 
				nickname: nickname
			})
		}
	}
}

export function* watchUserSetRequest() {
	while(true) {
		yield take(actions.user.USER_SET_REQUEST)
		yield call(userSetRequest)
	}
}


/*
**********************
* *******MEETING******
* ********************
 */

// GET 'meetings/id'

export function* getMeetingRequest(index) {
	const { status, data } = yield call(api.get, `${meetingUrl}${index}/`)

	if(status >= 400) {
		yield put({type: actions.meeting.REQUEST_FAILURE})
	}
	else{
		console.log(data)
		yield put({type: actions.meeting.GET_MEETING, meeting : data})		
	}

}
export function* watchGetMeetingRequest() {
	while(true) {
		const { token, index } = yield take(actions.meeting.GET_MEETING_REQUEST)
		yield call(getMeetingRequest, index)
	}
}

// POST 'meetings/'
export function* postMeetingRequest(meeting) {

	const token = yield localStorage.getItem("token")
	const { status, data } = yield call(api.post, meetingUrl, meeting, token)
	console.log(meeting)

	if(status >= 400) {
		yield put({type: actions.meeting.REQUEST_FAILURE})
	}
	else{
		console.log(data)
		yield put({type: actions.meeting.POST_MEETING, meeting : data})		
		// I think we should do ERROR HANDLING using "Catch"
	}
}

export function* watchPostMeetingRequest() {
	while(true) {
		const { meeting } = yield take(actions.meeting.POST_MEETING_REQUEST)
		yield call(postMeetingRequest, meeting)
	}
}

// PUT 'meetings/id/'
export function* putMeetingRequest(index, meeting) {

	const token = yield localStorage.getItem("token")
	console.log(meeting)
	const { status } = yield call(api.put, `${meetingUrl}${index}/`, meeting, token)
	if(status < 300) {
		yield put({type: actions.meeting.PUT_MEETING, meeting : meeting })
	}
	else{
		yield put({type: actions.meeting.REQUEST_FAILURE // dummy action 
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchPutMeetingRequest() {
	while(true) {
		const { index, meeting } = yield take(actions.meeting.PUT_MEETING_REQUEST)
		yield call(putMeetingRequest, index, meeting)
	}
}

// DELETE 'meetings/id/'
export function* deleteMeetingRequest(index) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.delete, meetingUrl+index+'/', token)
	if(status < 300) {
		yield put({type: actions.meeting.DELETE_MEETING, index : index})
	}
	else{
		yield put({type: actions.meeting.REQUEST_FAILURE // dummy action 
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchDeleteMeetingRequest() {
	while(true) {
		const { index } = yield take(actions.meeting.DELETE_MEETING_REQUEST)
		yield call(deleteMeetingRequest, index)
	}
}



	/*
// GET 'search/queryset/'
export function* searchMeetingRequest(token, query) {

	const { status, data } = yield call(api.get, backendUrl+'meetings/'+query+ '/', token)
	if(status === 200) {
		yield put({type: actions.meeting.GET_MEETING_LIST, meetings : data // Is it right? 
		})
	}
	else{
		yield put({type: actions.meeting.REQUEST_FAILURE // dummy action 
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchSearchMeetingRequest() {
	while(true) {
		const { token, query } = yield take(actions.meeting.GET_MEETING_LIST_REQUEST)
		yield call(searchMeetingRequest, token, query)
	}
}
*/
/*
TODO::
- joinMeeting Request
- acceptMeeting Request

I HAVE NOT DONE IT BECAUSE ACTION IS NOT SURE

 */


/*
****************************************
* **************COMMENT*****************
* **************************************

*** WE DON'T NEED "GET"
 */

// POST 'comment/'
export function* postCommentRequest(id, text) {

	const token = yield localStorage.getItem("token")
	
	const { status, data } = yield call(api.post, `${backendUrl}comment/`, {parent_meeting: id, comment_text: text}, token)
	if(status < 300) {
		yield put({type: actions.comment.POST_COMMENT})
	}
	else{
		yield put({type: actions.comment.FAILURE // dummy action 
		})
	}

}
export function* watchPostCommentRequest() {
	while(true) {
		const { id, text } = yield take(actions.comment.POST_COMMENT_REQUEST)
		yield call(postCommentRequest, id, text)
	}
}

// PUT 'comment/'
export function* putCommentRequest(id, text) {
	console.log(id)
	console.log(text)
	const token = yield localStorage.getItem("token")
	const { status, data } = yield call(api.put, `${backendUrl}comment/${id}/`, {comment_text: text}, token)
	if(status < 300) {
		yield put({type: actions.comment.PUT_COMMENT})
		//TODO::action might be edited
	}
	else{
		yield put({type: actions.comment.FAILURE //dummy action
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchPutCommentRequest() {
	while(true) {
		const { id, text } = yield take(actions.comment.PUT_COMMENT_REQUEST)
		yield call(putCommentRequest, id, text)
	}
}

// DELETE 'comment/id'

export function* deleteCommentRequest(index) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.delete, , token)
	if(status < 300) {
		yield put({type: actions.comment.DELETE_COMMENT,  index : index})
		//TODO::action might be edited
	}
	else{
		yield put({type: actions.comment.FAILURE // dummy action 
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchDeleteCommentRequest() {
	while(true) {
		const { id } = yield take(actions.comment.DELETE_COMMENT_REQUEST)
		yield call(deleteCommentRequest, id)
	}
}
*/

/*
*****************************************************
* *************User Detail***************************
* ***************************************************
*
* -> GET & PUT
 */

// GET 'user/index/'
export function* getUserRequest(index) {
	const { status, data } = yield call(api.userGet, index)
	console.log(data)
    if(status === 200) {
        yield put({type: actions.user.GET_USER, data: data})
    }
    else{
				yield put({type: actions.user.USER_FAILURE //dummy action 
				})
        // I think we should do ERROR HANDLING using "Catch"
    }
}

export function* watchGetUserRequest() {
	while(true) {
		const { index } = yield take(actions.user.GET_USER_REQUEST)
		yield call(getUserRequest, index)
	}
}

	/*
// PUT 'user/index/'
export function* putProfileRequest(token, profile, index) {

    const { status, data } = yield call(api.put, backendUrl+'user/'+index+'/', profile, token)
    if(status === 200) {
        yield put({type: actions.user.PUT_PROFILE, profile: profile})
    }
    else{
				yield put({type: actions.user.FAILURE // dummy action 
				})
        // I think we should do ERROR HANDLING using "Catch"
    }
}
export function* watchPutProfileRequest() {
    while(true) {
        const { profile, token, index } = yield take(actions.user.putProfileRequest)
        yield call(putProfileRequest, token, profile, index)
    }
}
*/


/*
ROOT
 */
export default function* rootSaga() {
	yield fork(watchSignupRequest)
	yield fork(watchSigninRequest)
	yield fork(watchUserSetRequest)

	yield fork(watchGetMeetingRequest)
	yield fork(watchPostMeetingRequest)

	yield fork(watchPutMeetingRequest)
	yield fork(watchDeleteMeetingRequest)

	//yield fork(watchSearchMeetingRequest)

	yield fork(watchPostCommentRequest)
	yield fork(watchPutCommentRequest)
	yield fork(watchDeleteCommentRequest)

	yield fork(watchGetUserRequest)
}
