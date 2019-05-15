/*global daum*/

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import SearchBar from '../molecules/SearchBar'
import ImageBox from '../molecules/ImageBox'

import { meeting } from '../../actions'
import './MeetingPage.css'

class MeetingPage extends Component {

	constructor(props) {
		super(props);
		this.props.showMeeting(this.props.match.params.id);
	}

	componentDidMount() {
		//this.props.getMeetingElementRequest()
		/*
		let el = document.getElementById('map');
		let map = new Kakao.maps.Map(el, {
			center: new Kakao.maps.LatLng(0, 0)
		});
		*/
	}

	render() {
		return (
			<div className="meeting_page">
				<Route component={SearchBar} />
				<div className="header">
					<div className="header_left">
						<div className="title">
							<h1> {this.props.meetingElement.name} </h1>
						</div>
						<div className="image_wrapper">
							<ImageBox 
								src={this.props.meetingElement.photo}
							/>
						</div>
					</div>
					<div className="content">
						<h3> 호스트 </h3>
						<div className="host_info">
							<p> {this.props.meetingElement.host} </p>
							<p> User info </p>
						</div>
						<h3> 날짜 </h3>
						<p> {this.props.meetingElement.date} </p>
						<h3> 모집 마감 </h3>
						<p> {this.props.meetingElement.deadline} </p>
						<h3> 위치 </h3>
						<p> {this.props.meetingElement.region} </p>
					</div>
				</div>
				<div className="description">
					<h2> 번개 내용 </h2>
					<hr />
					<p> {this.props.meetingElement.content} </p>
					<h2> 태그 </h2>
					<hr/>
					<ul>
						{this.props.meetingElement.tag.map(item => (
							<li key={`tag_${item.id}_${item}`}>
								{`#${item} `}
							</li>
						))}
					</ul>
					<h2> 지도 </h2>
					<hr/>
						<div 
							className="map"
							id="map"
						>
						</div>
					</div>
				<div className="comments">
					<h2> 댓글 </h2>
					<hr />
					<ul>
						{this.props.meetingElement.comment.map(item =>
							<li key={`${item.id}_${item.text}`}>
								<h3> {item.id} </h3>
								<p> {item.text} </p>
							</li>
							)}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		meetingElement: state.meeting.meetingElement,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		showMeeting: (id) => {
			dispatch(meeting.showMeeting(id))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);

