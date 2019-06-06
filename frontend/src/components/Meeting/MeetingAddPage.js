import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MeetingForm from './MeetingForm'

import * as actions from 'store/actions'

import './MeetingAddPage.css'

class MeetingAddPage extends Component {
	constructor(props) {
		super(props)
		this.props.waitRequest();
	}

	render() {
		return (this.props.postDone && !this.props.postFailed) ? (
			<Redirect to={`/meeting/${this.props.meetingElement.id}/`} />
		) : (
			<div className="meeting-add">
				<div className="meeting-add-title">
					<h1> 새 번개 생성 </h1>
					<hr/>
				</div>
				<div className="meeting-add-content">
					<MeetingForm functionType="POST"/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		postDone: state.meeting.postDone,
		postFailed: state.meeting.postFailed,
		meetingElement : state.meeting.meetingElement
	}
}

const mapDispatchToProps = dispatch => {
	return {
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MeetingAddPage)
