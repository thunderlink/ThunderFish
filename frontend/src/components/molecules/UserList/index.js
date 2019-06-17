import React, { Component } from 'react'

import UserElement from './UserElement'

import './UserList.css'
class UserList extends Component {
	render() {
		return (this.props.userList === null || this.props.userList === undefined) ?
			(null) : (
				<div className="user-list">
					<div className="user-list__title">
						<h2> {this.props.title} </h2>
						<p> 사용자의 이름 클릭시 해당 유저의 정보페이지로 이동합니다. </p>
					</div>
					<ul className="user-list__container">
						{
							Object.keys(this.props.userList).map(key => (
								<UserElement
									userId={this.props.userList[key].id}
									memId={this.props.userList[key].membership_id}
									userName={this.props.userList[key].name}
									meetingId={this.props.meetingId}
									showButton={this.props.showButton}
									key={`${key}_${this.props.userList[key].id}`}
								/>
							))
						}
					</ul>
				</div>
			)
	}
}

export default UserList
