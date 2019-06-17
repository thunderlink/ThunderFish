import { take, put, call, fork, select } from 'redux-saga/effects'
import api from '../services/api'
import * as actions from '../actions/index'

const signupUrl = 'http://127.0.0.1:8000/signup'

export function* signupRequest(user) {
	yield call(api.post, signupUrl, user, '')
}

export function* watchSignupRequest() {
	while(true){
		const { user } = yield take(actions.user.SIGNUP_REQUEST)
		yield call(signupRequest, user)
	}
}

export default function* registerSaga() {
	yield fork(watchSignupRequest)
}
