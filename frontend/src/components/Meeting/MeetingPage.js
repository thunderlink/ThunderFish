import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import CommentList from 'components/molecules/CommentList'
import UserList from 'components/molecules/UserList'
import MeetingDetail from './MeetingDetail'
import NotFound from 'components/NotFound'

import * as actions from 'store/actions'

import './MeetingPage.css'

class MeetingPage extends Component {

	state = {
		meetingId: 1,
		newComment: ""
	}

	constructor(props) {
		super(props)
		this.props.waitRequest()
		this.props.getMeetingRequest(this.props.match.params.id)

		this.state.meetingId = this.props.match.params.id
	}

	static getDerivedStateFromProps(props, state) {
		if(state.meetingId !== props.match.params.id) {
			props.waitRequest()
			props.getMeetingRequest(props.match.params.id)
			return({meetingId: props.match.params.id})
		}
		else return null
	}

	componentWillUnmount() {
		this.props.waitRequest()
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteMeetingRequest(this.props.meetingElement.id)
		this.props.history.push('/')
	}

	render() {
		return (!this.props.loadDone) ? (
			<Loading />
		) : (this.props.loadFailed) ? (
			<NotFound /> 
		) : (
			<div className="meeting-page">
				<div className="meeting-title">
					<h1> {this.props.meetingElement.name} </h1>
					<hr/>
				</div>
				<div className="meeting-content">
					<div className="meeting-info">
						<Route
							render={(props) => (<MeetingDetail {...props} meeting={this.props.meetingElement}/>)}
						/>
						{
							(this.props.id === this.props.meetingElement.host) ? (
								<UserList
									title="승인 대기중"
									userList={this.props.meetingElement.participant_waiting}
									meetingId={this.props.meetingElement.id}
									showButton={true}
								/>
							) : (
								null
							)
						}
					</div>
					<div className="meeting-guests">
						<UserList
							title="참여중"
							userList={this.props.meetingElement.participant_approved}
							meetingId={this.props.meetingElement.id}
							showButton={false}
						/>						
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);

