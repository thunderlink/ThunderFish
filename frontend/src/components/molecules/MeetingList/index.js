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
					this.props.meetings.map(item => (
					<Link 
						to={`/meeting/${item.id}`}
						key={`key_${item.name}_${item.id}`}
						className="meeting-link"
					>
						<MeetingElement
							name={item.name}
							date={item.date}
							host={item.nickname}
							latLng={{latitude: item.latitude, longitude: item.longitude}}
							photo={item.pic_url}
						/>
					</Link>
					))
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
