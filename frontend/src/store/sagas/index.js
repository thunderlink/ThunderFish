import { take, put, call, fork } from 'redux-saga/effects'
import axios from 'axios'

import api from 'services/api'
import * as actions from 'store/actions'

const backendUrl = 'http://18.216.47.154:8000'

/**************************************
 * Register Functions.
 *	Sign Up
 *	Sign In
 *	User Set
 **************************************/

/* Sign Up functions */

export function* kakaoLoginRequest(object) {
	const { status, data } = yield call(api.kakaoLogin, object)

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

export function* watchkakaoLoginRequest() {
	while(true){
		const { object } = yield take(actions.user.KAKAO_LOGIN_REQUEST)
		yield call(kakaoLoginRequest, object)
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
		const { status, id, nickname, pic_url } = yield call(api.userSet, token)
		if(status >= 400) {
			yield put({type: actions.user.USER_SET_FAILED})
		}
		else {
			yield put({
				type: actions.user.USER_SET_SUCCESSFUL,
				id: id,
				nickname: nickname,
				pic_url: pic_url
			})
			yield call(getNotificationRequest, id)
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

/* Join meeting */

/* Meeting post functions */
export function* joinMeetingRequest(index, user) {

	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.post, `${backendUrl}/meetings/${index}/join/`, user, token)

	if(status < 300) {
		yield call(getMeetingRequest, index)
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"JOIN_MEETING"})
	}
}

export function* watchJoinMeetingRequest() {
	while(true) {
		const { index, user } = yield take(actions.meeting.JOIN_MEETING_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(joinMeetingRequest, index, user)
	}
}

/* accept put function */

export function* acceptMeetingRequest(index, user) {

	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.put, `${backendUrl}/meetings/${index}/accept/${user}/`, {}, token)

	if(status < 300) {
		yield call(getMeetingRequest, index)
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"ACCEPT_MEETING"})
	}
}

export function* watchAccpetMeetingRequest() {
	while(true) {
		const { index, user } = yield take(actions.meeting.ACCEPT_MEETING_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(acceptMeetingRequest, index, user)
	}
}

/* reject put function */

export function* rejectMeetingRequest(index, user) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.put, `${backendUrl}/meetings/${index}/reject/${user}/`, {}, token)

	if(status < 300) {
		yield call(getMeetingRequest, index)
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"REJECT_MEETING"})
	}
}

export function* watchRejectMeetingRequest() {
	while(true) {
		const { index, user } = yield take(actions.meeting.REJECT_MEETING_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(rejectMeetingRequest, index, user)
	}
}

/* exit delete function */
export function* exitMeetingRequest(memid, pid) {
	console.log(`${pid}_${memid}`)
	const token = yield localStorage.getItem('token')
	const { status } = yield call(api.delete, `${backendUrl}/meetings/${pid}/join/${memid}/`, token)

	if(status < 300) {
		yield call(getMeetingRequest, pid)
	}
	else {
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"EXIT_MEETING"})
	}
}

export function* watchExitMeetingRequest() {
	while(true) {
		const { memid, pid } = yield take(actions.meeting.EXIT_MEETING_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(exitMeetingRequest, memid, pid)
	}
}

/* Meeting get functions */
export function* getMeetingRequest(index) {
	const { status, data } = yield call(api.get, `${backendUrl}/meetings/${index}/`)
	
	if(status < 300) {
		yield put({type: actions.meeting.GET_MEETING, meeting : data})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"GET_MEETING"})
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

	const token = yield localStorage.getItem("token")
	let res = {data: {id: 1}, status: 201}

	if(meeting.photo !== null) {
		const fd = new FormData();
		fd.append('profile', meeting.photo)
		res = yield axios.post(`${backendUrl}/image/`, fd)
			.then((res) => {
				if(res.status < 300)
					return {status: res.status, data: res.data}
				else
					return {status: res.status}
			})
	}

	if(res.status >= 300){
		return
	}
	
	const photoId = res.data.id
	res = yield call(api.post, `${backendUrl}/meetings/`, {...meeting, photo: photoId}, token)

	if(res.status < 300){
		yield put({type: actions.meeting.POST_MEETING, meeting: res.data})
	}
	else {
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"POST_MEETING"})
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

	const token = yield localStorage.getItem("token")
	let res = {data: {id: 1}, status: 201}

	if(meeting.photo !== null) {
		const fd = new FormData();
		fd.append('profile', meeting.photo)
		res = yield axios.post(`${backendUrl}/image/`, fd)
			.then((res) => {
				if(res.status < 300)
					return {status: res.status, data: res.data}
				else
					return {status: res.status}
			})
		if(res.status >= 300) {
			yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"PUT_MEETING"})
			return
		}
		meeting = {...meeting, photo: res.data.id}
		delete meeting.file
		delete meeting.originalPhoto
	}
	else {
		meeting = {...meeting, photo: meeting.originalPhoto}
		delete meeting.file
		delete meeting.originalPhoto
	}

	const { status, data } = yield call(api.put, `${backendUrl}/meetings/${index}/`, meeting, token)

	if(status < 300) {
		yield put({type: actions.meeting.PUT_MEETING, meeting: data})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"PUT_MEETING"})
	}
}

export function* watchPutMeetingRequest() {
	while(true) {
		const { index, meeting } = yield take(actions.meeting.PUT_MEETING_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(putMeetingRequest, index, meeting)
	}
}

/* Meeting delete functions */
export function* deleteMeetingRequest(index) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.delete, `${backendUrl}/meetings/${index}/`, token)
	if(status < 300) {
		yield put({type: actions.meeting.DELETE_MEETING, index : index})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"DELETE_MEETING"})
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
	console.log(query)

	const { status, data } = yield call(api.post, `${backendUrl}/search/`, query)
	if(status < 300) {
		yield put({type: actions.meeting.GET_MEETING_LIST, meetings : data})
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"GET_MEETING_LIST"})
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
	const { status, data } = yield call(api.get, `${backendUrl}/meetings/new/${index}/`)

	if(status < 300) {
		yield put({type: actions.meeting.GET_RECENT_MEETING, meetings: data, index: index})
	}
	else {
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"GET_RECENT_MEETING"})
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
export function* postCommentRequest(pid, text) {

	const token = yield localStorage.getItem("token")

	const { status } = yield call(api.post, `${backendUrl}/comment/`, {parent_meeting: pid, comment_text: text}, token)
	if(status < 300) {
		yield put({type: actions.comment.POST_COMMENT})
		yield call(getMeetingRequest, pid)
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"POST_COMMENT"})
	}
}

export function* watchPostCommentRequest() {
	while(true) {
		const { pid, text } = yield take(actions.comment.POST_COMMENT_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(postCommentRequest, pid, text)
	}
}

/* Comment put functions */
export function* putCommentRequest(pid, id, text) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.put, `${backendUrl}/comment/${id}/`, {comment_text: text}, token)

	if(status < 300) {
		yield put({type: actions.comment.PUT_COMMENT})
		yield call(getMeetingRequest, pid)
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"PUT_COMMENT"})
	}
}

export function* watchPutCommentRequest() {
	while(true) {
		const { pid, id, text } = yield take(actions.comment.PUT_COMMENT_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(putCommentRequest, pid, id, text)
	}
}

/* Comment delete functions */
export function* deleteCommentRequest(pid, id) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.delete, `${backendUrl}/comment/${id}/`, token)
	if(status < 300) {
		yield put({type: actions.comment.DELETE_COMMENT})
		yield call(getMeetingRequest, pid)
	}
	else{
		yield put({type: actions.meeting.MEETING_REQUEST_FAILURE, code:"DELETE_COMMENT"})
	}
}

export function* watchDeleteCommentRequest() {
	while(true) {
		const { pid, id } = yield take(actions.comment.DELETE_COMMENT_REQUEST)
		yield put({type: actions.meeting.WAIT_REQUEST})
		yield call(deleteCommentRequest, pid, id)
	}
}

/**************************************
 * User Functions.
 *  GET user
 *	PUT user
 **************************************/
/* User get functions */
export function* getUserRequest(index) {
	const { status, data } = yield call(api.userGet, index)
	if(status === 200) {
		yield put({type: actions.user.GET_USER, data: data})
	}
	else{
		yield put({type: actions.user.USER_REQUEST_FAILURE, code: "GET_USER"})
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
	let res = {data: {id: 1}, status: 201}

	if(profile.photo !== null) {
		const fd = new FormData();
		fd.append('profile', profile.photo)
		res = yield axios.post(`${backendUrl}/image/`, fd)
			.then((res) => {
				if(res.status < 300)
					return {status: res.status, data: res.data}
				else
					return {status: res.status}
			})

		if(res.status >= 300) {
			yield put({type: actions.user.USER_REQUEST_FAILURE, code:"PUT_USER"})
			return
		}
		profile = {...profile, photo: res.data.id}
		delete profile.file
		delete profile.originalPhoto
	}
	else {
		profile = {...profile, photo: profile.originalPhoto}
		delete profile.file
		delete profile.originalPhoto
	}

	const { status } = yield call(api.put, `${backendUrl}/user/${index}/`, profile, token)

	if(status === 200) {
		yield call(getUserRequest, index)
		yield put({type: actions.user.PUT_USER})
	}
	else{
		yield put({type: actions.user.USER_REQUEST_FAILURE, code: "PUT_USER"})
	}
}

export function* watchPutUserRequest() {
	while(true) {
		const { index, profile } = yield take(actions.user.PUT_USER_REQUEST)
		yield put({type: actions.user.WAIT_REQUEST})
		yield call(putUserRequest, index, profile)
	}
}

/**************************************
 * Notification Functions
 *  Get Notification
 *	Read Notification
 **************************************/
export function* getNotificationRequest(id) {
	const token = yield localStorage.getItem("token")
	const { status, data } = yield call(api.get, `${backendUrl}/user/${id}/notification/`, token)
	if(status === 200) {
		yield put({type: actions.notification.GET_NOTIFICATION, notification_list: data})
	}
	else{

	}
}

export function* watchGetNotificationRequest() {
	while(true) {
		const { id } = yield take(actions.notification.GET_NOTIFICATION_REQUEST)
		yield call(getNotificationRequest, id)
	}
}

export function* readNotificationRequest(uid, id) {
	const token = yield localStorage.getItem("token")
	const { status } = yield call(api.put, `${backendUrl}/user/${uid}/notification/${id}/`, {}, token)

	if(status < 300) {
		yield call(getNotificationRequest, uid)
	}
}
export function* watchReadNotificationRequest() {
	while(true) {
		const { uid, id } = yield take(actions.notification.READ_NOTIFICATION_REQUEST)
		yield call(readNotificationRequest, uid, id)
	}
}

export default function* rootSaga() {

	yield fork(watchkakaoLoginRequest)

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

	yield fork(watchJoinMeetingRequest)
	yield fork(watchAccpetMeetingRequest)
	yield fork(watchRejectMeetingRequest)
	yield fork(watchExitMeetingRequest)

	yield fork(watchReadNotificationRequest)
	yield fork(watchGetNotificationRequest)
}
