import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import Loading from 'components/Loading'
import ImageBox from 'components/molecules/ImageBox'
import CommentList from 'components/molecules/Comment/CommentList'
import MeetingDetail from './MeetingDetail'
import NotFound from 'components/NotFound'

import * as actions from 'store/actions'

import default_meeting from 'icons/default-meeting.png'

import './MeetingPage.css'

class MeetingPage extends Component {

	state = {
		newComment: ""
	}

	constructor(props) {
		super(props)
		this.props.waitRequest()
		this.props.getMeetingRequest(this.props.match.params.id)
	}

	componentWillUnmount() {
		this.props.waitRequest()
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteMeetingRequest(this.props.meetingElement.id)
		this.props.history.push('/')
	}

	onAcceptHandler = (mem_id) => (e) => {
		e.preventDefault()
		this.props.acceptRequest(this.props.meetingElement.id, mem_id)
	}

	onRejectHandler = (mem_id) => (e) => {
		e.preventDefault()
		this.props.rejectRequest(this.props.meetingElement.id, mem_id)
	}

	render() {
		return (!this.props.loadDone) ? (
			<Loading />
		) : (this.props.loadFailed) ? (
			<NotFound /> 
		) : (
			<div className="meeting-page">
				{ console.log(this.props.meetingElement)}
				<div className="meeting-title">
					<h1> {this.props.meetingElement.name} </h1>
					<hr/>
				</div>
				<div className="meeting-content">
					<div className="meeting-info">
						<Route
							render={(props) => (<MeetingDetail {...props} meeting={this.props.meetingElement}/>)}
						/>
						{(this.props.meetingElement.host === this.props.id) ? (
							<ul className="participant-list">
								<div className="participant-title">
									<h2> 승인 대기중 </h2>
									<p> {'사용자 이름 클릭시 해당 유저의 정보를 볼 수 있습니다.'} </p>
								</div>
								{
									Object.keys(this.props.meetingElement.participant_waiting).map(key => (
										<li className="participant-item" key={key}>
											<Link
												className="participant-name"
												to={`/user/${this.props.meetingElement.participant_waiting[key].id}`}
											>
												{
													this.props.meetingElement.participant_waiting[key].name
												}
											</Link>
											<button
												className="accept"
												onClick={this.onAcceptHandler(this.props.meetingElement.participant_waiting[key].membership_id)}
											>
												수락하기
											</button>
											<button
												className="reject"
												onClick={this.onRejectHandler(this.props.meetingElement.participant_waiting[key].membership_id)}
											>
												거절하기
											</button>
										</li>
									))}
							</ul>
						) : (
							<div/>
						)}
					</div>
					<div className="meeting-guests">
						<ul className="participant-list">
							<div className="participant-title">
								<h2> 참여중 </h2>
								<p> 사용자 이름 클릭시 해당 유저의 정보를 볼 수 있습니다. </p>
							</div>
							{
								Object.keys(this.props.meetingElement.participant_approved).map(key => (
									<li className="participant-item" key={key}>
										<Link
											className="participant-name"
											to={`/user/${this.props.meetingElement.participant_approved[key].id}`}
										>
											{
												this.props.meetingElement.participant_approved[key].name
											}
										</Link>
									</li>
								))
							}
						</ul>
						<div className="comments">
							<h1> 댓글 </h1>
							<CommentList
								comments={this.props.meetingElement.comments}
								meetingId={this.props.meetingElement.id}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		meetingElement: state.meeting.meetingElement,
		loadDone: state.meeting.loadDone,
		loadFailed: state.meeting.loadFailed,
		id: state.user.id,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMeetingRequest: (index) => {
			dispatch(actions.meeting.getMeetingRequest(index))
		},
		deleteMeetingRequest: (index) => {
			dispatch(actions.meeting.deleteMeetingRequest(index))
		},
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		},
		postCommentRequest: (id, text) => {
			dispatch(actions.comment.postCommentRequest(id, text))
		},

		acceptRequest: (index, user) => {
			dispatch(actions.meeting.acceptMeetingRequest(index, user))
		},

		rejectRequest: (index, user) => {
			dispatch(actions.meeting.acceptMeetingRequest(index, user))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);

