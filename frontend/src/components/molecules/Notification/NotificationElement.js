import React, { Component } from 'react'
import './NotificationElement.css'

class NotificationElement extends Component {

    onClickHandler = (meetingid, id) => {
        this.props.readNotification(id/*notification id*/, this.props.pid)
        this.props.history.push(`/meeting/${meetingid}`);
    }


    render() {
        return(
            <div className="notification_element">
                <div className="notification_type">
                    </div>
                    <p> New Notification on  <strong>Meeting #{this.props.meeting}</strong> </p>
                    <button
                        className="read"
                        onClick={this.onClickHandler(this.props.meeting, this.props.id)}
                    > Click to Read </button>
            </div>
        )
    }
}

export default NotificationElement
