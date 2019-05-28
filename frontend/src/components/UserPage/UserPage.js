import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import UserDetail from './UserDetail'
import MeetingList from './MeetingList'
import SearchBar from '../molecules/SearchBar'
import ImageBox from '../molecules/ImageBox'

import * as actions from '../../actions'

import report from '../../icons/report-button.png'
import edit from '../../icons/edit-button.png'

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
				<div className="user-component" >
					<UserDetail user={this.props.user} />
				</div>
				<div className="meeting-component">
					<div className="meeting-lists">
						{
							console.log(this.props.user)
						}
						<h1> 호스팅한 번개 </h1>
						<hr />
						<MeetingList meetings={this.props.user.meeting_hosted} />
						<h1> 참가한 번개 </h1>
						<hr />
						<MeetingList meetings={this.props.user.meeting_set} />
						<h1> 참여 대기중 </h1>
						<hr />
						<MeetingList meetings={this.props.user.membership_set} />
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
