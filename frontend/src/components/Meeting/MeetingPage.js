import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Comments from './Comments'

import SearchBar from '../molecules/SearchBar'
import ImageBox from '../molecules/ImageBox'
import KakaoMap from '../molecules/KakaoMap'
import * as actions from '../../actions'
import './MeetingPage.css'

class MeetingPage extends Component {

	state = {
		newComment: ""
	}

	constructor(props) {
		super(props)
		this.props.waitRequest()
		this.props.getMeetingRequest(this.props.match.params.id)
		this.routeChange = this.routeChange.bind(this)
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		this.props.waitRequest()
	}


	routeChange = () => {
		this.props.history.push(`/meeting/${this.props.meetingElement.id}/edit`)
	}

	onSubmitCommentHandler = (e) => {
		e.preventDefault()
		this.props.postCommentRequest(this.props.meetingElement.id, this.state.newComment)
	}

	onPutHandler = (e) => {
		e.preventDefault()
		this.props.putMeetingRequest(/* TODO :: meeting*/)
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteMeetingRequest(this.props.meetingElement.id)
		this.props.history.push('/')
	}

	render() {
		return (!this.props.loadDone) ? (
			<div> Loading... </div>
		) : (
			<div className="meeting_page">
				<Route component={SearchBar} />
				<div className="header">
					<div className="header_title">
						<h1> {this.props.meetingElement.name} </h1>
					</div>
					<div className="header_content">
						<div className="header_left">
							<div className="image_wrapper">
								<ImageBox 
									src={this.props.meetingElement.photo}
								/>
							</div>
							<div className="left_buttons">
								<button> 참가하기 </button>
								<button> 신고하기 </button>
							</div>
						</div>
						<div className="content">
							<h3> 호스트 </h3>
							<div className="host_info">
								<p> {this.props.meetingElement.nickname} </p>
								<Link 
									to={`/user/${this.props.meetingElement.host}/`}
								> 
									User info 
								</Link>
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
							<h3> 최대 인원 </h3>
							<p> {this.props.meetingElement.max_participant} </p>
							<h3> 모집 상태 </h3>
							<p> 
								{(this.props.meetingElement.status === 0) 
										? '모집중' : '마감'}
							</p>
						</div>
					</div>
				</div>
				<div className="description">
					<h2> 번개 내용 </h2>
					<hr />
					<p> {this.props.meetingElement.content} </p>
					<h2> 태그 </h2>
					<hr/>
					<ul>
						{
							Object.keys(this.props.meetingElement.tag_set).map(key => (
								<li key={`tag_${key}`}>
									<Link 
										to={`/search/${this.props.meetingElement.tag_set[key]}`} 
									>
										{`#${this.props.meetingElement.tag_set[key]} `}
									</Link>
								</li>
							))}					
						</ul>
					<h2> 지도 </h2>
					<hr/>
						<div 
							className="map"
						>
							<KakaoMap 
								name={this.props.meetingElement.region}
							/>
						</div>
					</div>
				<div className="comments">
					<h2> 댓글 </h2>
					<hr />
					<div>
						{
							Object.keys(this.props.meetingElement.comments).map(key => (
							<Comments
							key={`comment_${key}`}
							commentDetail={this.props.meetingElement.comments[key]}
							/>
							))
						}
					</div>
					<div className="add_comments">
						<form onSubmit={this.onSubmitCommentHandler}>
							<input 
								type="text" 
								onChange={e => this.setState({newComment: e.target.value})}
								id="new_comment"
							/>
							<button type="submit"> 작성하기 </button>
						</form>
					</div>
				</div>
				<div className="meeting_buttons">
					<button onClick={this.routeChange} > 수정 </button>
					<button onClick={this.onDeleteHandler}> 삭제 </button>
				</div>
			</div>
		)}
}

/*

							*/

const mapStateToProps = state => {
	return {
		meetingElement: state.meeting.meetingElement,
		loadDone: state.meeting.loadDone
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
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		},
		postCommentRequest: (id, text) => {
			dispatch(actions.comment.postCommentRequest(id, text))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);

