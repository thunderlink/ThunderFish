import React, { Component } from 'react'
import Moment from 'react-moment'

import ImageBox from  '../molecules/ImageBox'

import default_meeting from '../../icons/default-meeting.png'
import './MeetingElement.css'

class MeetingElement extends Component {
	render() {
		return(
			<div className="meeting_element">
				<div className="image_wrapper">
					<ImageBox 
						default={default_meeting}
						src={this.props.photo}
					/>
				</div>
				<div className="meeting_content">
					<div className="title">
						<div className="small_square"/>
						<h2>{this.props.name} </h2>
					</div>
					<p> <strong>{this.props.host}</strong> host </p>
					<Moment format='LLLL' locale='ko'
						parse="YYYY-MM-DDTHH:mm:ssZZ"
					> 
						{this.props.date} 
					</Moment>
					<p> {this.props.region} </p>
				</div>
			</div>
		)
	}
}

export default MeetingElement
