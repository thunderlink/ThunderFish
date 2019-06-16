import * as actions from './index'

describe('actions', () => {
	describe('Comment', () => {
		it('should crate comment actions', () => {
			const expectedActions = [
				{ type: actions.comment.POST_COMMENT_REQUEST },
				{ type: actions.comment.PUT_COMMENT_REQUEST },
				{ type: actions.comment.DELETE_COMMENT_REQUEST },
			];
			const actions = [
				actions.comment.postCommentRequest,
				actions.comment.putCommentRequest,
				actions.comment.deleteCommentRequest,
			];
			expect(actions).toEqual(expectedActions);
		});
	});
	describe('Meeting', () => {
		it('should create meeting actions', () => {
			const expectedActions = [
				{ type: actions.meeting.GET_MEETING_REQUEST },
				{ type: actions.meeting.POST_MEETING_REQUEST },
				{ type: actions.meeting.PUT_MEETING_REQUEST },
				{ type: actions.meeting.DELETE_MEETING_REQUEST },
				{ type: actions.meeting.GET_MEETING_LIST_REQUEST },
				{ type: actions.meeting.GET_RECENT_MEETING_REQUEST },
				{ type: actions.meeting.JOIN_MEETING_REQUEST },
				{ type: actions.meeting.ACCEPT_MEETING_REQUEST },
				{ type: actions.meeting.REJECT_MEETING_REQUEST },
			];
			const actions = [
				actions.meeting.getMeetingRequest,
				actions.meeting.postMeetingRequest,
				actions.meeting.putMeetingRequest,
				actions.meeting.deleteMeetingRequest,
				actions.meeting.getMeetingListRequest,
				actions.meeting.getRecentMeetingRequest,
				actions.meeting.joinMeetingRequest,
				actions.meeting.acceptMeetingReuqest,
				actions.meeting.rejectMeetingRequest,
			];
			expect(actions).toEqual(expectedActions);
		});
	});
	describe('Notification', () => {
		it('should create meeting actions', () => {
			const expectedActions = [
				{ type: actions.notification.GET_NOTIFICATION_REQUEST },
				{ type: actions.notification.READ_NOTIFICATION_REQUEST },
			];
			const actions = [
				actions.notification.getNotificationRequest,
				actions.notification.readNotificationRequest,
			];
			expect(actions).toEqual(expectedActions);
		});
	});
	describe('User', () => {
		it('should create meeting actions', () => {
			const expectedActions = [
				{ type: actions.user.SIGNUP_REQUEST },
				{ type: actions.user.KAKAO_LOGIN_REQUEST },
				{ type: actions.user.SIGNUP_DONE },
				{ type: actions.user.SIGNIN_REQUEST },
				{ type: actions.user.SIGNIN_SUCCESSFUL },
				{ type: actions.user.SIGNOUT },
				{ type: actions.user.USER_SET_REQUEST },
				{ type: actions.user.WAIT_REQUEST },
				{ type: actions.user.GET_USER_REQUEST },
				{ type: actions.user.PUT_USER_REQUEST },
			];
			const actions = [
				actions.user.kakaologinRequest,
				actions.user.signupRequest,
				actions.user.signupDone,
				actions.user.signinRequest,
				actions.user.signinSuccessful,
				actions.user.signout,
				actions.user.userSetRequest,
				actions.user.waitRequest,
				actions.user.getUserRequest,
				actions.user.putUserRequest
			];
			expect(actions).toEqual(expectedActions);
		});
	});
})
