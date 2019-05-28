import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import ImageBox from 'components/molecules/ImageBox'
import KakaoMap from 'components/molecules/KakaoMap'
import CommentList from 'components/molecules/Comment/CommentList'

import * as actions from 'store/actions'

import default_meeting from 'icons/default-meeting.png'

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
			<div className="meeting-page">
				<div className="meeting-title">
					<h1> {this.props.meetingElement.name} </h1>
					<hr/>
				</div>
				<div className="meeting-content">
					<div className="detail">
						<div className="description">
							<div className="image-wrapper">
								<ImageBox 
									src={this.props.meetingElement.photo}
									default={default_meeting}
								/>
							</div>							
							<div className="description-body">
								<div className="host-info">
									<p> 
										<strong> {this.props.meetingElement.nickname} </strong>
										호스트
									</p>
									<Link
										to={`/user/${this.props.meetingElement.host}/`}
									>
										정보
									</Link>
								</div>
								<div className="meeting-info">
									<p> {this.props.meetingElement.content} </p>
									<ul className="tag-list">
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
							
									{(this.props.meetingElement.host === this.props.id) ? (
										<div className="host-buttons">
											<button onClick={this.routeChange} > 수정 </button>
											<button onClick={this.onDeleteHandler}> 삭제 </button>
										</div>
									) : (
										<div className="guest-buttons">
											<button> 참가하기 </button>
											<button> 신고하기 </button>
										</div>
									)}
								</div>
							</div>
							<ul className="description-list">
								<li>
									<p> 
										<strong> 현재 상태 </strong>
										{(this.props.meetingElement.status === 0) 
												? '모집중' : '마감'
										}
									</p>
								</li>
								<li>
									<p>
										<strong> 날짜 </strong>
										<Moment format='LLLL' locale='ko'>
											{this.props.meetingElement.date}
										</Moment>
									</p>
								</li>
								<li>
									<p>
										<strong> 모집 마감 </strong>
										<Moment format='LLLL' locale='ko'>
											{this.props.meetingElement.deadline}
										</Moment>
									</p>
								</li>
								<li>
									<p>
										<strong> 최대 인원 </strong>
										{this.props.meetingElement.max_participant}명
									</p>
								</li>
							</ul>
						</div>
						<div className="meeting-place">
							<div 
								className="map"
							>
								<KakaoMap	
									name={this.props.meetingElement.region}	
								/>
							</div>
							<ul className="description-list">
								<li>
									<p className="location">
										<strong> 위치 </strong>
										{this.props.meetingElement.region}
									</p>
								</li>
							</ul>
						</div>
					</div>
					<div className="comments">
						<h1> 댓글 </h1>
						<CommentList
							comments={this.props.meetingElement.comments}
							meetingId={this.props.meetingElement.id}
						/>
					</div>
				</div>
			</div>
		)}
}

/*
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


							*/

const mapStateToProps = state => {
	return {
		meetingElement: state.meeting.meetingElement,
		loadDone: state.meeting.loadDone,
		id: state.user.id,
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

