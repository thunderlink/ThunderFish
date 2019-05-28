import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'store/actions'

import MeetingList from 'components/molecules/Meeting/MeetingList'

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
				<div className="search-page">
					<div className="search-title">
						<h1> {this.props.match.params.query} 검색 결과 </h1>
						<hr />
					</div>
					<div className="search-content">
						<div className="search-list">
							<MeetingList meetings={this.props.meetingList} />
						</div>
						<div className="search-option">
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
