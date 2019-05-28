import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import UserDetail from './UserDetail'
import MeetingList from 'components/molecules/Meeting/MeetingList'
import ImageBox from 'components/molecules/ImageBox'

import * as actions from 'store/actions'

import report from 'icons/report-button.png'
import edit from 'icons/edit-button.png'

import "./UserPage.css"

class UserPage extends Component {

	state = {
	}

	constructor(props) {
		super(props)
		this.props.getUserRequest(this.props.match.params.id)
	}

	render() {
		return (this.props.user == null) ?
			(<div> Loading... </div>) :
		(
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
							{
								console.log(this.props.user)
							}
							<h1> 참가중인 번개 </h1>
							<hr />
							<MeetingList meetings={this.props.user.meeting_set} />
							<h1> 승인 대기중인 번개 </h1>
							<hr />
							<MeetingList meetings={this.props.user.membership_set} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUserRequest: (user) => {
			dispatch(actions.user.getUserRequest(user))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
