import { combineReducers } from 'redux'
import meeting from './Meeting'
import comment from './Comment'
import user from './User'
import notification from './Notification'
const rootReducer = combineReducers({
	meeting,
	comment,
	user,
	notification
})

export default rootReducer
