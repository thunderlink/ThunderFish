import { combineReducers } from 'redux'
import meeting from './Meeting'
import comment from './Comment'
import user from './User'

const rootReducer = combineReducers({
	meeting,
	comment,
	user
})

export default rootReducer
