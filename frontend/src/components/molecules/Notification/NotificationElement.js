import React, { Component } from 'react'
import './NotificationElement.css'

class NotificationElement extends Component {

    onClickHandler = (meetingid, id) => {
        this.props.readNotification(id/*notification id*/, this.props.pid)
        this.props.getNotification(this.props.pid)
        this.props.history.push(`/meeting/${meetingid}`);
    }

    status = (notification) => {
        switch (notification) {
            case '0' :
                return <p>New Apply</p>
            case '1' :
                return <p>New Comment</p>
            case '2' :
                return <p>Apply Reject</p>
            case '3' :
                return <p>Apply Approved</p>
        }
    }

    render() {
        return(
            (!this.props.read) ? (
                <div className="notification_unread">
                    <div className="notification_type">
                        status(this.props.notification)
                    </div>

                    <p> New Notification on  <strong>Meeting #{this.props.meeting}</strong> </p>
                    <button
                        className="read"
                        onClick={this.onClickHandler(this.props.meeting, this.props.id)}
                    > Click to Read </button>
                </div>
            ) : (
                <div className="notification_read">
                    <div className="notification_type">
                        status(this.props.notification)
                    </div>

                    <p> New Notification on  <strong>Meeting #{this.props.meeting}</strong> </p>
                </div>
            )
        )
    }
}

export default NotificationElement
