import meeting, { initialState } from './Meeting'
import * as actions from '../actions/Meeting'

describe('Reducers', () => {
	describe('WAIT_REQUEST', () => {
		it('should wait reqeusts', () => {
			expect(meeting(
				initialState,
				actions.waitRequest()
			)).toEqual({...initialState, postDone: false, loadDone: false})
		});
	});
});
