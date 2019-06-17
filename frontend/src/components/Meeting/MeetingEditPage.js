import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MeetingForm from './MeetingForm'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'

import * as actions from 'store/actions'

import './MeetingEditPage.css'

class MeetingEditPage extends Component {

	constructor(props){
		super(props)
		this.props.waitRequest()
		this.props.getMeetingRequest(this.props.match.params.id)
	}
	
	render() {        
		return (!this.props.loadDone) ? (
			<Loading />
		) : (this.props.loadFailed) ? (
			<NotFound />
		) : (this.props.postDone && !this.props.postFailed) ? (
			<Redirect to={`/meeting/${this.props.match.params.id}/`} />
		) : (
			<div className="meeting-edit">
				<div className="meeting-edit-title">
					<h1> 번개 수정 </h1>
					<hr />
				</div>
				<div className="meeting-edit-content">
					<MeetingForm functionType="PUT" meeting={this.props.meetingElement} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loadDone: state.meeting.loadDone,
		loadFailed: state.meeting.loadFailed,
		postDone: state.meeting.postDone,
		postFailed: state.meeting.poastFailed,
		meetingElement: state.meeting.meetingElement
	}
}

const mapDispatchToProps = dispatch => {
	return {
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		},
		getMeetingRequest : (index) => {
			dispatch(actions.meeting.getMeetingRequest(index))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MeetingEditPage)
