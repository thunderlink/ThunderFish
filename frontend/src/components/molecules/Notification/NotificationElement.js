import React, { Component } from 'react'
import './NotificationElement.css'
import { Link } from 'react-router-dom'

class NotificationElement extends Component {

    sexy(notification){
            {console.log(this.props.meeting)}
            {console.log(this.props.notification)}
            {console.log(this.props.id)}

        switch (notification) {
            case 0 :
                return (<p>New Apply</p>)
            case 1 :
                return (<p>New Comment</p>)
            case 2 :
                return (<p>Apply Reject</p>)
            case 3 :
                return (<p>Apply Approved</p>)
        }
    }

    render() {
        return(

            (!this.props.read) ? (
                <div className="notification_unread">
                    <div className="notification_type">
                        {this.sexy(this.props.notification)}
                    </div>

                    <p> New Notification on  <strong>Meeting #{this.props.meeting}</strong> </p>
                    <Link to={`/meeting/${this.props.meeting}`}
                        className="read"
                        onClick={() => {
                            this.props.readNotification(this.props.id, this.props.pid)
                            this.props.getNotification(this.props.pid);
                        }}
                    > Click to Read </Link>
                </div>
            ) : (
                <div className="notification_read">
                    <div className="notification_type">
                        {this.sexy(this.props.notification)}
                    </div>
                    <p> Checked Notification on  <strong>Meeting #{this.props.meeting}</strong> </p>

                    <Link to={`/meeting/${this.props.meeting}`}
                          className="read"
                          onClick={() => {
                              this.props.getNotification(this.props.pid);
                          }}
                    > Click to Read </Link>
                </div>
            )
        )
    }
}

export default NotificationElement
