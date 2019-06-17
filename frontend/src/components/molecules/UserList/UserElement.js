import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from 'store/actions'

import './UserElement.css'

class UserElement extends Component {

	onAcceptHandler = (e) => {
		e.preventDefault();
		this.props.acceptRequest(this.props.meetingId, this.props.memId)
	}

	onRejectHandler = (e) => {
		e.preventDefault();
		this.props.rejectRequest(this.props.meetingId, this.props.memId)
	}
	
	render() {
		return (
			<div className="user-element">
				<Link
					className="user-element-name"
					to={`/user/${this.props.userId}/`}
				>
					{this.props.userName}
				</Link>
				{
					(this.props.showButton) ? (
						<div className="user-element-button-set">
							<button
								className="accept"
								onClick={this.onAcceptHandler}
							>
								수락
							</button>
							<button
								className="reject"
								onClick={this.onRejectHandler}
							>
								거절
							</button>
						</div>
					) : (
						null
					)
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
		acceptRequest: (index, user) => {
			dispatch(actions.meeting.acceptMeetingRequest(index, user))
		},
		rejectRequest: (index, user) => {
			dispatch(actions.meeting.rejectMeetingRequest(index, user))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserElement)
