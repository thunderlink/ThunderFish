import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import MeetingElement from '../Search/MeetingElement.js'

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
							region={item.region}
							photo={item.photo}
						/>
					</Link>
				))}
			</div>
		)
	}
}

export default MeetingList
