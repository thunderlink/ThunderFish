import { take, put, call, fork } from 'redux-saga/effects'

import api from 'services/api'
import * as actions from 'store/actions'

const backendUrl = 'http://18.216.47.154:8000/'

/**************************************
 * Register Functions.
 *	Sign Up
 *	Sign In
 *	User Set
 **************************************/

/* Sign Up functions */

export function* kakaologinRequest(object) {
	const { status, data } = yield call(api.kakaologin, object)

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

export function* watchkakaologinRequest() {
	while(true){
		const { object } = yield take(actions.user.KAKAO_LOGIN_REQUEST)
		yield call(kakaologinRequest, object)
	}
}

export function* signupRequest(user) {
	const { status } = yield call(api.signup, user)
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

/* Sign In Functions */
export function* signinRequest(username, password) {
	const user = {
		username: username,
		password: password
	}
	const { status, data } = yield call(api.signin, user)
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

/* User Set functions */
export function* userSetRequest() {
	const token = yield localStorage.getItem("token")

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


/**************************************
 * Meeting Functions.
 *	GET meeting
 *	POST meeting
 *	PUT meeting
 *	DELETE meeting
 *
 *	GET meeting list
 *
 * Umimplement yet
 *  Accept Meeting
 *  Deny Meeting
 *  Join Meeting
 *  Cancel join meeting
 **************************************/
/* Meeting get functions */
export function* getMeetingRequest(index) {
	const { status, data } = yield call(api.get, `${backendUrl}meetings/${index}/`)
	if(status >= 400) {
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE})
	}
	else{
		yield put({type: actions.meeting.GET_MEETING, meeting : data})		
	}

}
export function* watchGetMeetingRequest() {
	while(true) {
		const { index } = yield take(actions.meeting.GET_MEETING_REQUEST)
		yield call(getMeetingRequest, index)
	}
}

/* Meeting post functions */
export function* postMeetingRequest(meeting) {

	console.log("do post")
	console.log(meeting)
	const token = yield localStorage.getItem("token")
	const { status, data } = yield call(api.post, `${backendUrl}meetings/`, meeting, token)
	console.log("end post")
	console.log(data)
	if(status >= 400) {
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE})
	}
	else{
		yield put({type: actions.meeting.POST_MEETING, meeting : data})		
	}
}

export function* watchPostMeetingRequest() {
	while(true) {
		const { meeting } = yield take(actions.meeting.POST_MEETING_REQUEST)
		yield call(postMeetingRequest, meeting)
	}
}

/* Meeting put functions */
export function* putMeetingRequest(index, meeting) {

	console.log("do put")
	console.log(meeting)
	const token = yield localStorage.getItem("token")
	const { status, data } = yield call(api.put, `${backendUrl}meetings/${index}/`, meeting, token)
	console.log("end put")
	console.log(data)
	if(status < 300) {
		yield put({type: actions.meeting.PUT_MEETING, meeting: data})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE})
	}
}
export function* watchPutMeetingRequest() {
	while(true) {
		const { index, meeting } = yield take(actions.meeting.PUT_MEETING_REQUEST)
		yield call(putMeetingRequest, index, meeting)
	}
}

/* Meeting delete functions */
export function* deleteMeetingRequest(index) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.delete, `${backendUrl}meetings/${index}/`, token)
	if(status < 300) {
		yield put({type: actions.meeting.DELETE_MEETING, index : index})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE})
	}
}
export function* watchDeleteMeetingRequest() {
	while(true) {
		const { index } = yield take(actions.meeting.DELETE_MEETING_REQUEST)
		yield call(deleteMeetingRequest, index)
	}
}

/* Meeting list get functions */
export function* getMeetingListRequest(query) {
	const { status, data } = yield call(api.get, `${backendUrl}search/${query}`)
	if(status < 300) {
		yield put({type: actions.meeting.GET_MEETING_LIST, meetings : data})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE})
	}
}
export function* watchGetMeetingListRequest() {
	while(true) {
		const { query } = yield take(actions.meeting.GET_MEETING_LIST_REQUEST)
		yield call(getMeetingListRequest, query)
	}
}

/* Recent Meeting get functions */
export function* getRecentMeetingRequest(index) {
	console.log(index);
	const { status, data } = yield call(api.get, `${backendUrl}meetings/new/${index}/`)
	console.log(data)
	if(status < 300) {
		yield put({type: actions.meeting.GET_RECENT_MEETING, meetings: data, index: index})
	}
	else {
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE})
	}
}

export function* watchGetRecentMeetingRequest() {
	while(true) {
		const { index } = yield take(actions.meeting.GET_RECENT_MEETING_REQUEST)
		yield call(getRecentMeetingRequest, index)
	}
}

/**************************************
 * Comment Functions.
 *	POST comment
 *	PUT comment
 *	DELETE comment
 **************************************/
/* Comment post functions */
export function* postCommentRequest(id, text) {

	const token = yield localStorage.getItem("token")
	
	const { status } = yield call(api.post, `${backendUrl}comment/`, {parent_meeting: id, comment_text: text}, token)
	if(status < 300) {
		yield put({type: actions.comment.POST_COMMENT})
	}
	else{
		yield put({type: actions.comment.COMMENT_REQUEST_FAILURE})
	}

}
export function* watchPostCommentRequest() {
	while(true) {
		const { id, text } = yield take(actions.comment.POST_COMMENT_REQUEST)
		yield call(postCommentRequest, id, text)
	}
}

/* Comment put functions */
export function* putCommentRequest(id, text) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.put, `${backendUrl}comment/${id}/`, {comment_text: text}, token)

	if(status < 300) {
		yield put({type: actions.comment.PUT_COMMENT})
	}
	else{
		yield put({type: actions.comment.COMMENT_REQUEST_FAILURE})
	}
}
export function* watchPutCommentRequest() {
	while(true) {
		const { id, text } = yield take(actions.comment.PUT_COMMENT_REQUEST)
		yield call(putCommentRequest, id, text)
	}
}

/* Comment delete functions */
export function* deleteCommentRequest(index) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.delete, `${backendUrl}comment/${index}/`, token)
	if(status < 300) {
		yield put({type: actions.comment.DELETE_COMMENT})
	}
	else{
		yield put({type: actions.comment.COMMENT_REQUEST_FAILURE})
	}
}

export function* watchDeleteCommentRequest() {
	while(true) {
		const { id } = yield take(actions.comment.DELETE_COMMENT_REQUEST)
		yield call(deleteCommentRequest, id)
	}
}

/**************************************
 * User Functions.
 *  GET user
 *	PUT user
 *
 * Improvements
 *  Should get more detail of meetings
 **************************************/
/* User get functions */
export function* getUserRequest(index) {
	const { status, data } = yield call(api.userGet, index)
	if(status === 200) {
		yield put({type: actions.user.GET_USER, data: data})
	}
	else{
		yield put({type: actions.user.USER_REQUEST_FAILURE})
	}
}

export function* watchGetUserRequest() {
	while(true) {
		const { index } = yield take(actions.user.GET_USER_REQUEST)
		yield call(getUserRequest, index)
	}
}


/* User put functions */
export function* putUserRequest(index, profile) {
	const token = yield localStorage.getItem("token")
	const { status, data } = yield call(api.put, `${backendUrl}user/${index}/`, profile, token)
	if(status === 200) {
		yield put({type: actions.user.PUT_PROFILE, profile: profile})
	}
	else{
		yield put({type: actions.user.USER_REQUEST_FAILURE})
	}
}

export function* watchPutUserRequest() {
	while(true) {
		const { index, profile } = yield take(actions.user.PUT_USER_REQUEST)
		yield call(putUserRequest, index, profile)
	}
}

export default function* rootSaga() {

	yield fork(watchkakaologinRequest)

	yield fork(watchSignupRequest)
	yield fork(watchSigninRequest)
	yield fork(watchUserSetRequest)

	yield fork(watchGetMeetingRequest)
	yield fork(watchPostMeetingRequest)

	yield fork(watchPutMeetingRequest)
	yield fork(watchDeleteMeetingRequest)

	yield fork(watchGetMeetingListRequest)
	yield fork(watchGetRecentMeetingRequest)

	yield fork(watchPostCommentRequest)
	yield fork(watchPutCommentRequest)
	yield fork(watchDeleteCommentRequest)

	yield fork(watchGetUserRequest)
	yield fork(watchPutUserRequest)
}
