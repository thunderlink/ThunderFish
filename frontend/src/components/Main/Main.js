import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import MeetingList from 'components/molecules/Meeting/MeetingList'

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
					<div className="welcome">
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
