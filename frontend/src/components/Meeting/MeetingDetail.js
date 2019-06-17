import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import ImageBox from 'components/molecules/ImageBox'
import { KakaoViewMap } from 'components/molecules/KakaoMap'

import * as actions from 'store/actions'

import default_meeting from 'icons/default-meeting.png'

import './MeetingDetail.css'

class MeetingDetail extends Component {

	state = {
		onParticipant: false,
		currentId: -1,
		memId: -1,
	}

	static defaultProps = {
		type: "normal"
	}

	static getDerivedStateFromProps(props, state) {
		if(props.type === "normal") {
			if(props.id !== state.currentId) {
				let ret = false;
				let mem = -1;
				if(props.meeting.participant_approved === undefined ||
					props.meeting.participant_waiting === undefined)
					return null;

				Object.keys(props.meeting.participant_approved).map(key => {
					if (props.meeting.participant_approved[key].id === props.id) {
						ret = true;
						mem = key;
					}
					return null;
				})

				Object.keys(props.meeting.participant_waiting).map(key => {
					if (props.meeting.participant_waiting[key].id === props.id) {
						ret = true;
						mem = key;
					}
					return null;
				})
				return {
					currentId: props.id,
					onParticipant: ret,
					memId: mem,
				}
			}
			else
				return null
		}
		else
			return null
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteMeetingRequest(this.props.meeting.id)
		this.props.history.push('/')
	}

	onEditHandler = (e) => {
		e.preventDefault()
		this.props.history.push(`/meeting/${this.props.meeting.id}/edit`)
	}

	onJoinHandler = (e) => {
		e.preventDefault()
		this.props.joinMeetingRequest(this.props.meeting.id)
	}

	onExitHandler = (e) => {
		e.preventDefault()
		this.props.exitMeetingRequest(this.state.memId, this.props.meeting.id)
	}

	render() {
		return (this.props.meeting === undefined || this.props.meeting === null) ? (
			<div/>
		) : (
			<div className="meeting-detail">
				<div className="description">
					<div className="image-wrapper">
						<ImageBox
							src={this.props.meeting.pic_url}
							default={default_meeting}
						/>
					</div>
					<div className="description-body">
						<div className="host-info">
							<p>
								<strong> {this.props.meeting.nickname} </strong>
								호스트
							</p>
							<Link
								to={`/user/${this.props.meeting.host}/`}
							>
								정보
							</Link>
						</div>
						<div className="meeting-info">
							<p> {this.props.meeting.content} </p>
							<ul className="tag-list">
								{
									Object.keys(this.props.meeting.tag_set).map(key => (
										<li key={`tag_${key}`}>
											<Link
												to={`/search//tag&${this.props.meeting.tag_set[key]}`}
											>
												{`#${this.props.meeting.tag_set[key]} `}
											</Link>
										</li>
									))
								}
							</ul>
							{(this.props.meeting.host === this.props.id) ? (
								<div className="host-buttons">
									<button onClick={this.onEditHandler} > 수정 </button>
									<button onClick={this.onDeleteHandler}> 삭제 </button>
								</div>
							) : (
								<div className="guest-buttons">
									{
										(this.state.onParticipant)
											? (<button onClick={this.onExitHandler}> 참가 취소 </button>)
											:	(this.props.meeting.status === 0 && this.props.isAuthenticated) 
												? (<button onClick={this.onJoinHandler}> 참가하기 </button>)
												: (null)
									}
								</div>
							)}
						</div>
					</div>
					<ul className="description-list">
						<li>
							<p>
								<strong> 현재 상태 </strong>
								{(this.props.meeting.status === 0) ? '모집중' : '마감'}
							</p>
						</li>
						<li>
							<p>
								<strong> 날짜 </strong>
								<Moment format='LLLL' locale='ko'>
									{this.props.meeting.date}
								</Moment>
							</p>
						</li>
						<li>
							<p>
								<strong> 모집 마감 </strong>
								<Moment format='LLLL' locale='ko'>
									{this.props.meeting.deadline}
								</Moment>
							</p>
						</li>
						<li>
							<p>
								<strong> 최대 인원 </strong>
								{this.props.meeting.max_participant}명
							</p>
						</li>
					</ul>
				</div>
				<div className="meeting-place">
					<div
						className="map"
					>
						<KakaoViewMap
							region={this.props.meeting.region}
							latitude={this.props.meeting.latitude}
							longitude={this.props.meeting.longitude}
						/>
					</div>
					<ul className="description-list">
						<li>
							<p className="location">
								<strong> 위치 </strong>
								{this.props.meeting.region}
							</p>
						</li>
					</ul>
				</div>
			</div>
		)
  }
}

const mapStateToProps = state => {
	return {
		id: state.user.id,
		isAuthenticated: state.user.isAuthenticated
	}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteMeetingRequest: (index) => {
			dispatch(actions.meeting.deleteMeetingRequest(index))
		},
		joinMeetingRequest: (index, user) => {
			dispatch(actions.meeting.joinMeetingRequest(index))
		},
		exitMeetingRequest: (memid, pid) => {
			dispatch(actions.meeting.exitMeetingRequest(memid, pid))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail)
