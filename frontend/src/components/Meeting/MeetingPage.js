/*global daum*/

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Comments from './Comments'

import SearchBar from '../molecules/SearchBar'
import ImageBox from '../molecules/ImageBox'

import * as actions from '../../actions'
import './MeetingPage.css'

class MeetingPage extends Component {

	constructor(props) {
		super(props);
		//console.log(this.props.match.params.id);
		this.props.getMeetingRequest(this.props.match.params.id)
		this.routeChange = this.routeChange.bind(this);
	}

	componentWillMount() {

		//this.createMap()
	}

	state = {
		flag : false
	}

	createMap() {
		var coord = new daum.maps.LatLng(33.450701, 126.570667)

		var container = document.getElementById('map');
		var options = {
			center: coord
		}
		var map = new daum.maps.Map(container, options)

		var zoomControl = new daum.maps.ZoomControl()

		var marker = new daum.maps.Marker({
			position: coord
		});

		var infoContent = `<div>${this.props.meetingElement.name}</div>`
		var infowindow = new daum.maps.InfoWindow({
			position: coord,
			content: infoContent
		})

		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT)
		marker.setMap(map)
		infowindow.open(map, marker)
	}

	routeChange = () => {
		this.props.history.push('/meeting/'+this.props.meetingElement.id+'/edit')
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteMeetingRequest(this.props.meetingElement.id)
		this.props.history.push('/')
	}

	render() {
		return (this.props.meetingElement == undefined) ?
			(<div> Loading... </div>) :
			(
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
						<Moment format='LLLL' locale='ko'>
							{this.props.meetingElement.date}
						</Moment>
						<p/>
						<h3> 모집 마감 </h3>
						<Moment format='LLLL' locale='ko'>
							{this.props.meetingElement.deadline}
						</Moment>
						<p/>
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
					<div>
						{
							(this.props.meetingElement.comments !== undefined) ?

							Object.keys(this.props.meetingElement.comments).map(key => (
							<Comments
							key={`comment_${key}`}
							commentDetail={this.props.meetingElement.comments[key]}
							/>
							))
								: <h2>No Comment</h2>
						}

					</div>
				</div>
				<div className="buttons">
					<button onClick={this.routeChange} > 수정 </button>
					<button onClick={this.onDeleteHandler}> 삭제 </button>
				</div>
			</div>
		)
	}
}
/*
						{this.props.meetingElement.tag.map(item => (
							<li key={`tag_${item.id}_${item}`}>
								{`#${item} `}
							</li>
						))}
							*/
const mapStateToProps = state => {
	return {
		meetingElement: state.meeting.meetingElement,
		requestDone: state.meeting.requestDone,
		getDone: state.meeting.getDone
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMeetingRequest: (index) => {
			dispatch(actions.meeting.getMeetingRequest(index))
		},
		deleteMeetingRequest: (index) => {
			dispatch(actions.meeting.deleteMeetingRequest(index))
		},


	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);

