import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import Loading from 'components/Loading'
import ImageBox from 'components/molecules/ImageBox'
import KakaoMap from 'components/molecules/KakaoMap'
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
		this.routeChange = this.routeChange.bind(this)
	}

	componentWillUnmount() {
		this.props.waitRequest()
	}


	routeChange = () => {
		this.props.history.push(`/meeting/${this.props.meetingElement.id}/edit`)
	}

	onPutHandler = (e) => {
		e.preventDefault()
		this.props.putMeetingRequest(/* TODO :: meeting*/)
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
					<Route
						render={(props) => (<MeetingDetail {...props} meeting={this.props.meetingElement}/>)}
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
		)}
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);

