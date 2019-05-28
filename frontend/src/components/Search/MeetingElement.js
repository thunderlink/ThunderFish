import React, { Component } from 'react'

import ImageBox from  '../molecules/ImageBox'
import './MeetingElement.css'

class MeetingElement extends Component {
	render() {
		return(
			<div className="meeting_element">
				<div className="image_wrapper">
					<ImageBox src={this.props.photo}/>
				</div>
				<div className="meeting_content">
					<div className="title">
						<div className="small_square"/>
						<h2>{this.props.name} </h2>
					</div>
					<p> <strong>{this.props.host}</strong> host </p>
					<p> {this.props.date} </p>
					<p> {this.props.region} </p>
				</div>
			</div>
		)
	}
}

export default MeetingElement
