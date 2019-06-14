import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NotificationElement from './NotificationElement.js'

import dead_fish from 'icons/dead-fish.png'
import './NotificationList.css'
import {connect} from "react-redux";
import * as actions from 'store/actions'
import Loading from "../../Loading";

class NotificationList extends Component {

    constructor(props) {
        super(props);
        this.props.userSetRequest();
    }

    render() {
        return(
            <div className="notification-list">
                <Link
                    className="notification-link"
                    to={`/notification`}
                >
                    Notifications
                </Link>


                {
                    (this.props.pid === -1) ? (
                        <Loading/>
                    ) : (this.props.notification_list === undefined || this.props.notification_list === null
                        ||this.props.notification_list.length === 0) ? (
                        <div className="no-notification-wrapper">
                            <p className="no-notification"> 알림이 관측되지 않았어요.... </p>
                            <img src={dead_fish} alt="dead fish" />
                        </div>
                    ) : (

                            <div>
                                {console.log(this.props.notification_list)}
                                {Object.keys(this.props.notification_list).map(item => (
                            <NotificationElement
                                meeting={item.meeting}
                                id={item.pk}
                                pid={this.props.pid}
                                notification={item.notification}
                                read={item.read}
                            />)
                            )}
                            </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pid: state.user.id,
        notification_list : state.notification.notification_list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        readNotification: (id, pid) => {
            dispatch(actions.notification.readnotificationRequest(id, pid))
        },
        getNotification: (pid) => {
            dispatch(actions.notification.getnotificationRequest(pid))
        },
        userSetRequest: () => {
            dispatch(actions.user.userSetRequest());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)

