import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserDetail from './UserDetail'
import MeetingList from 'components/molecules/MeetingList'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'

import * as actions from 'store/actions'

import "./UserPage.css"

class UserPage extends Component {

	state = {
	}

	constructor(props) {
		super(props)
		this.props.waitRequest()
		this.props.getUserRequest(this.props.match.params.id)
	}

	render() {
		return (!this.props.loadDone) ? (
			<Loading />
		) : (this.props.loadFailed) ? (
			<NotFound />
		) : (
			<div className="user-page">
				<div className="user-page-title">
					<h1> 이용자 정보 </h1>
					<hr />
				</div>
				<div className="user-page-content">
					<div className="user-component" >
						<UserDetail user={this.props.user} />
						<h1> 호스팅한 번개 </h1>
						<hr />
						<MeetingList meetings={this.props.user.meeting_hosted} />
					</div>
					<div className="meeting-component">
						<div className="meeting-lists">
							<h1> 승인 대기중인 번개 </h1>
							<hr />
							<MeetingList meetings={this.props.user.meeting_waiting_set} />
							<h1> 참가중인 번개 </h1>
							<hr />
							<MeetingList meetings={this.props.user.meeting_approved_set} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user.user,
		loadDone: state.user.loadDone,
		loadFailed: state.user.loadFailed
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUserRequest: (user) => {
			dispatch(actions.user.getUserRequest(user))
		},
		waitRequest: () => {
			dispatch(actions.user.waitRequest())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
