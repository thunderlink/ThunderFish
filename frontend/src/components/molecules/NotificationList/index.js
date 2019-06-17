import React, { Component } from 'react'

import NotificationElement from './NotificationElement.js'

import dead_fish from 'icons/dead-fish.png'
import './NotificationList.css'

import {connect} from "react-redux";
import * as actions from 'store/actions'

class NotificationList extends Component {

	constructor(props) {
		super(props);
		this.props.userSetRequest();
	}

	onClickElementHandler = (id, uid, mid) => (e) => {
		e.preventDefault();
		this.props.readNotification(id, uid)
		this.props.history.push(`/meeting/${mid}`)
	}

	render() {
		return(
			<div className="notification-absolute" id="notification_center">
				<div className="notification-fang" />
				<div className="notification-content">
					<div className="notification-content__header">
						<p> 알림 </p>
					</div>
					{
						(this.props.notification_list === undefined || 
							this.props.notification_list === null ||
							this.props.notification_list.length === 0) ? (
								<div className="notification-content__list">
									<div className="notification-notfound">
										<p className="notification-notfound__text"> 
											알림이 없어요... 
										</p>
										<img 
											className="notification-notfound__img" 
											src={dead_fish} alt="not found" 
										/>
									</div>
								</div>
							) : (
								<div className="notification-content__list">
									{
										Object.keys(this.props.notification_list).map(item => (
											<div 
												className="notification-element-wrapper" 
												onClick={this.onClickElementHandler(
													this.props.notification_list[item].id,
													this.props.uid,
													this.props.notification_list[item].meeting
												)}
												key={`${item}_${this.props.uid}`}
											>
												<NotificationElement
													meeting={this.props.notification_list[item].meeting}
													id={this.props.notification_list[item].id}
													uid={this.props.uid}
													notification={this.props.notification_list[item].notification}
													read={this.props.notification_list[item].checked}
												/>
											</div>
										))
									}
								</div>
							)
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		uid: state.user.id,
		notification_list : state.notification.notification_list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		readNotification: (id, uid) => {
			dispatch(actions.notification.readNotificationRequest(id, uid))
		},
		getNotification: (uid) => {
			dispatch(actions.notification.getNotificationRequest(uid))
		},
		userSetRequest: () => {
			dispatch(actions.user.userSetRequest());
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)

