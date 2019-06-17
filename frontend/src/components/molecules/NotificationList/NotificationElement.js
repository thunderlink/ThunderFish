import React, { Component } from 'react'
import './NotificationElement.css'

class NotificationElement extends Component {

	constructor(props) {
		super(props)
		if(props.read) {
			this.style = {background: '#ffffff'}
		}
		else {
			this.style = {background: '#ffffdd'}
		}
		
	}

	makeComponent = (not_id) => {
		switch (not_id) {
			case 0 :
				return "에 새로운 참가 신청이 있습니다."
			case 1 :
				return "에 새로운 댓글이 있습니다."
			case 2 :
				return " 참여가 거절되었습니다."
			case 3 :
				return " 참여가 승인되었습니다."
			default:
				return ""
		}
	}

	render() {
		return(
			<div className="notification-element" style={this.style}>
				<p> 
					<strong>{this.props.meeting}</strong>
					{this.makeComponent(this.props.notification)} 
				</p>
			</div>
		)
	}
}

export default NotificationElement
