import { take, put, call, fork, select } from 'redux-saga/effects'
import api from '../services/api'
import * as actions from '../actions/index'

const signupUrl = 'http://127.0.0.1:8000/signup'

export function* signupRequest(user) {
	const status = yield call(api.post, signupUrl, user, '')
	if(status >= 400) {
		yield put({type: actions.user.SIGNUP_FAILED})
	}
	else {
		yield put({type: actions.user.SIGNUP, user: user})
	}
}

export function* watchSignupRequest() {
	while(true){
		const { user } = yield take(actions.user.SIGNUP_REQUEST)
		yield call(signupRequest, user)
	}
}

export function* signinRequest(username, password) {
	const user = {
		username: username,
		password: password
	}
	const { status, data } = yield call(api.post, user, '')
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


export default function* rootSaga() {
	yield fork(watchSignupRequest)
	yield fork(watchSigninRequest)
}
