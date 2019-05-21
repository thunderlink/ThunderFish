import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import SearchBar from '../molecules/SearchBar'
import MeetingElement from './MeetingElement'

import './SearchPage.css'

class SearchPage extends Component {

	onClickMeeting = (id) => (e) => {
		this.props.history.push(`/meeting/${id}/`)
	}

	render() {
		return(
			<div className="search_page">
				<Route component={SearchBar} />
				<div className="search_content">
					<div className="search_option">
					</div>				
					<div className="search_list">
						{this.props.meetingList.map(item => (
							<div 
								onClick={this.onClickMeeting(item.id)}
								key={`key_${item.name}`}
							>
								<MeetingElement
									name={item.name}
									date={item.date}
									host={item.host}
									region={item.region}
									photo={item.photo}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		)	
	}
}

const mapStateToProps = state => {
	return {
		meetingList: state.meeting.meetingList
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
