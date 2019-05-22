import { take, put, call, fork, select } from 'redux-saga/effects'
import api from '../services/api'
import * as actions from '../actions/index'

/*
SIGN UP
 */

const backendUrl = 'http://127.0.0.1:8000/'

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
	if(status === 200) {
		yield put({type: actions.user.SIGNIN_SUCCESSFUL, token: data.token, username: username})
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








/*
**********************
* *******MEETING******
* ********************
 */

// GET 'meetings/id'
/*
export function* getMeetingRequest(token, index) {
	const { status, data } = yield call(api.get, backendUrl+'meetings/'+index+ '/', token)
	if(status === 200) {
		yield put({type: actions.meeting.GET_MEETING, meeting : data})
	}
	else{
		yield put({type: actions.meeting.REQUEST_FAILURE // dummy action 
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchGetMeetingRequest() {
	while(true) {
		const { token, index } = yield take(actions.meeting.GET_MEETING_REQUEST)
		yield call(getMeetingRequest, token, index)
	}
}

// POST 'meetings/'
export function* postMeetingRequest(token, meeting) {

	const { status } = yield call(api.post, backendUrl+'meetings/', meeting, token)
	if(status === 200) {
		yield put({type: actions.meeting.POST_MEETING, meeting : meeting})
	}
	else{
		yield put({type: actions.meeting.REQUEST_FAILURE // dummy action
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}

export function* watchPostMeetingRequest() {
	while(true) {
		const { token, meeting } = yield take(actions.meeting.POST_MEETING_REQUEST)
		yield call(postMeetingRequest, token, meeting)
	}
}

// PUT 'meetings/id/'
export function* putMeetingRequest(token, meeting) {

	const { status } = yield call(api.put, backendUrl+'meetings/', meeting, token)
	if(status === 200) {
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
		const { token, meeting } = yield take(actions.meeting.PUT_MEETING_REQUEST)
		yield call(putMeetingRequest, token, meeting)
	}
}

// DELETE 'meetings/id/'
export function* deleteMeetingRequest(token, index) {

	const { status } = yield call(api.delete, backendUrl+'meetings/' + index + '/', token)
	if(status === 200) {
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
		const { token, index } = yield take(actions.meeting.DELETE_MEETING_REQUEST)
		yield call(deleteMeetingRequest, token, index)
	}
}

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
/*
// POST 'comment/'
export function* postCommentRequest(token, comment) {

	const { status, data } = yield call(api.post, backendUrl+'comment/', comment, token)
	if(status === 200) {
		yield put({type: actions.comment.POST_COMMENT, //TODO::action might be edited
		comment : comment})
	}
	else{
		yield put({type: actions.comment.FAILURE // dummy action 
		})
		// I think we should do ERROR HANDLING using "Catch"
	}
}
export function* watchPostCommentRequest() {
	while(true) {
		const { comment, token } = yield take(actions.comment.postCommentRequest)
		yield call(postCommentRequest, token, comment)
	}
}

// PUT 'comment/'
export function* putCommentRequest(token, comment, index) {

	const { status, data } = yield call(api.put, backendUrl+'comment/'+index+'/', comment, token)
	if(status === 200) {
		yield put({type: actions.comment.PUT_COMMENT, comment : comment, index : index})
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
		const { comment, token, index } = yield take(actions.comment.putCommentRequest)
		yield call(putCommentRequest, token, comment, index)
	}
}

// DELETE 'comment/id'
export function* deleteCommentRequest(token, index) {

	const { status} = yield call(api.delete, backendUrl+'comment/'+index+'/', token)
	if(status === 200) {
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
		const { token, index } = yield take(actions.comment.deleteCommentRequest)
		yield call(deleteCommentRequest, token, index)
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
	/*
// GET 'user/index/'
export function* getProfileRequest(token, index) {

    const { status, data } = yield call(api.get, backendUrl+'user/'+index+'/', token)
    if(status === 200) {
        yield put({type: actions.user.GET_PROFILE, profile: profile})
    }
    else{
				yield put({type: actions.user.FAILURE //dummy action 
				})
        // I think we should do ERROR HANDLING using "Catch"
    }
}
export function* watchGetProfileRequest() {
    while(true) {
        const { token, index } = yield take(actions.user.getProfileRequest)
        yield call(getProfileRequest, token,  index)
    }
}


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
		/*
	yield fork(watchGetMeetingRequest)
	yield fork(watchPostMeetingRequest)
	yield fork(watchPutMeetingRequest)
	yield fork(watchDeleteMeetingRequest)
	yield fork(watchSearchMeetingRequest)

	yield fork(watchPostCommentRequest)
	yield fork(watchPutCommentRequest)
	yield fork(watchDeleteCommentRequest)
	*/
}
