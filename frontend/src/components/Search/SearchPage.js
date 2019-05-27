import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import SearchBar from '../molecules/SearchBar'
import MeetingElement from './MeetingElement'

import './SearchPage.css'

class SearchPage extends Component {

	state = {
		query: ''
	}

	constructor(props) {
		super(props)
		//this.props.waitRequest()
		this.state.query = this.props.match.params.query
		this.props.getMeetingListRequest(this.state.query)
	}

	componentWillUnmount() {
		this.props.waitRequest()
	}

	static getDerivedStateFromProps(props, state) {
		if(props.match.params.query !== state.query) {
			props.getMeetingListRequest(props.match.params.query)
			return {
				query: props.match.params.query
			}
		}
		else
			return null
	}

	onClickMeeting = (id) => (e) => {
		this.props.getMeetingRequest(id)
		this.props.history.push(`/meeting/${id}/`)
	}

	render() {
		return (!this.props.searchDone) ?
			(
				<div> Loading... </div>
			) :	(
			<div className="search_page">
				<Route component={SearchBar} />
				<div className="search_content">
					<div className="search_option">
					</div>				
					<div className="search_list">
						{
							console.log(this.props.meetingList)
						}
						{
							this.props.meetingList.map(item => (
							<div 
								onClick={this.onClickMeeting(item.id)}
								key={`key_${item.name}_${item.id}`}
							>
								<MeetingElement
									name={item.name}
									date={item.date}
									host={item.nickname}
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
		meetingList: state.meeting.meetingList,
		searchDone: state.meeting.searchDone
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMeetingListRequest : (query) => {
			dispatch(actions.meeting.getMeetingListRequest(query))
		},
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		},
		getMeetingRequest: (id) => {
			dispatch(actions.meeting.getMeetingRequest(id))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
