import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import MeetingList from 'components/molecules/MeetingList'
import Welcome from'./Welcome'

import * as actions from 'store/actions'

import './Main.css'

class Main extends Component {
	state = {
		currentIndex: 1
	}

	constructor(props) {
		super(props)
		this.props.getRecentMeetingRequest(1);
	}

	render() {
		return (
			<div className="main-page">
				<div className="main-page-content">
					<div className="welcome-wrapper">
						<Welcome 
							isAuthenticated={this.props.isAuthenticated}
							user={this.props.user}
							id={this.props.id}
						/>
					</div>
					<div className="recent-meetings">
						<h1> 최근 생성된 번개</h1>
						<hr />
						<MeetingList meetings={this.props.meetingList} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.user.isAuthenticated,
		id: state.user.id,
		user: state.user.nickname,
		meetingList: state.meeting.meetingList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getRecentMeetingRequest: (index) => {
			dispatch(actions.meeting.getRecentMeetingRequest(index))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
