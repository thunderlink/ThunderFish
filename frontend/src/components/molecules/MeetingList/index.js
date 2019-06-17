import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import MeetingElement from './MeetingElement.js'

import dead_fish from 'icons/dead-fish.png'

import './MeetingList.css'

class MeetingList extends Component {
	render() {
		return(
			<div className="meeting-list">
				{
					(this.props.meetings !== null &&
						this.props.meetings !== undefined) ? (
							Object.keys(this.props.meetings).map(key => (
								<Link 
									to={`/meeting/${this.props.meetings[key].id}`}
									key={`key_${this.props.meetings[key].name}_${this.props.meetings[key].id}`}
									className="meeting-link"
								>
									<MeetingElement
										name={this.props.meetings[key].name}
										date={this.props.meetings[key].date}
										host={this.props.meetings[key].nickname}
										latLng={{latitude: this.props.meetings[key].latitude, longitude: this.props.meetings[key].longitude}}
										photo={this.props.meetings[key].pic_url}
									/>
								</Link>
							))) : (null)
				}
				{
					(this.props.meetings.length === 0) ? (
						<div className="no-meeting-wrapper">
							<p className="no-meeting"> 번개가 관측되지 않았어요.... </p>
							<img src={dead_fish} alt="dead fish" />
						</div>
					) :	(
						<div className="no-meeting-wrapper">
							<p className="no-meeting"/>
						</div>
					)
				}
			</div>
		)
	}
}

export default MeetingList
