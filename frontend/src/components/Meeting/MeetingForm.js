import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MeetingDetail from './MeetingDetail'
import { KakaoSelectMap } from 'components/molecules/KakaoMap'

import * as actions from 'store/actions/'

import './MeetingForm.css'

class MeetingForm extends Component {

	state = {
		file: '',
		preview: '',
		name: '',
		date: '',
		max_participant: 0,
		deadline: '',
		region: '',
		latitude: 37.46001,
		longitude: 126.95126,
		content: '',
		tag: '',
		open_chat: '',
	}

	constructor(props){
		super(props)
		if(this.props.functionType==="PUT") {
			let tags = ''
			Object.keys(this.props.meeting.tag_set).map(key => {
				tags = tags + this.props.meeting.tag_set[key] + " "
			})
			this.state = {
				file: '',
				preview: this.props.meeting.photo,
				name: this.props.meeting.name,
				date: this.props.meeting.date,
				max_participant: this.props.meeting.max_participant,
				deadline: this.props.meeting.deadline,
				region: this.props.meeting.region,
				content: this.props.meeting.content,
				tag: tags,
				open_chat: this.props.meeting.open_chat,
			}
			this.state.preview = ''
		}
	}

	meetingSerializer = () => {
		return {
			//photo: this.state.file,
			name: this.state.name,
			date: this.state.date,
			max_participant: this.state.max_participant,
			deadline: this.state.deadline,
			region: this.state.region,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			content: this.state.content,
			tag: this.state.tag,
			open_chat: this.state.open_chat
		}
	}

	meetingPreview = () => {
		const parsedTag = this.state.tag.split(" ");
		return Object.assign(this.meetingSerializer(), {
			nickname: this.props.nickname,
			tag_set: parsedTag,
			photo: this.state.preview,
		})
	}

	handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader()
		let file = e.target.files[0]
		reader.onloadend = () => {
			this.setState({
				file: file,
				preview: reader.result
			});
		}

		reader.readAsDataURL(file)
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		if(this.props.functionType==="POST")
			this.props.postMeetingRequest(this.meetingSerializer())
		else
			this.props.putMeetingRequest(this.props.meeting.id, this.meetingSerializer())
	}

	onChangePlace = (newState) => {
		console.log(newState)
		this.setState(newState)
	}

	onChangeDate = (date) => {
		console.log(date)
		this.setState({date: date})
	}	
	
	onChangeDeadline = (date) => {
		console.log(date)
		this.setState({deadline: date})
	}

	render() {
		return (
			<div className="meeting-form">
				<div className="input-fields">
					<div className="input-title">
						<h2> 번개 정보 입력 </h2>
					</div>
					<form onSubmit={this.onSubmitHandler}>
						<div className="input-item">
							<p className="input-item__title"> 사진 </p>
							<input
								className="input-item__input"
								type="file" id="photo" onChange={this.handleImageChange}
							/>
						</div>
						<div className="input-item">
							<p className="input-item__title"> 번개 이름 </p>
							<input 
								className="input-item__input"
								type="text" id="meetingName" value={this.state.name}
								placeholder="번개의 이름을 입력하세요."
								onChange={(e)=>this.setState({name : e.target.value})}
							/>
						</div>
					</form>
					<div className="input-item">
						<p className="input-item__title"> 날짜 </p>
						<input
							className="input-item__input"
							type="datetime-local" id="date" 
							value={this.state.date}
							onChange={(e)=>this.setState({date: e.target.value})}
						/>
					</div>
					<div className="input-item">
						<p className="input-item__title"> 신청 마감일 </p>
						<input
							className="input-item__input"
							type="datetime-local" id="deadline" 
							value={this.state.deadline}
							onChange={(e)=>this.setState({deadline: e.target.value})}
						/>					
					</div>
					<form>
						<div className="input-item">
							<p className="input-item__title"> 최대 인원 </p>
							<input
								className="input-item__input"
								type="number" id="maxParticipant" 
								value={this.state.max_participant}
								onChange={(e)=>this.setState({max_participant: e.target.value})}
							/>
						</div>
					</form>
						<div className="input-item">
							<p className="input-item__title"> 위치 </p>
							<div className="map-wrapper">
								<KakaoSelectMap
									onChangePlace={this.onChangePlace}
									latitude={this.state.latitude}
									longitude={this.state.longitude}
									region={this.state.region}
								/>
							</div>
						</div>
					<form onSubmit={this.onSubmitHandler}>
						<div className="input-item">
							<p className="input-item__title"> 내용 </p>
							<textarea
								className="input-item__textarea" 
								type="text" id="detail" value={this.state.content}
								onChange={(e)=>this.setState({content : e.target.value})}
							/>
						</div>
						<div className="input-item">
							<p className="input-item__title"> 태그 </p>
							<input
								className="input-item__input"
								type="text" id="tag" value={this.state.tag}
								placeholder="태그는 띄어쓰기로 구분해주세요."
								onChange={(e)=>this.setState({tag : e.target.value})}
							/>
						</div>
						<div className="input-item">
							<p className="input-item__title"> 채팅방 링크 </p>
							<input
								className="input-item__input"
								type="text" id="open_chat" value={this.state.open_chat}
								onChange={(e)=>this.setState({open_chat : e.target.value})}
								placeholder="To be added..."
							/>
						</div>
						<button className="submit-button" type="submit"> 
							{(this.props.functionType==="PUT") ? 
									"번개 수정하기" : "번개 만들기"
							}
						</button>
					</form>
				</div>
				<div className="meeting-preview">
					<h1> {`${this.state.name} 미리보기`} </h1>
					<hr />
					<MeetingDetail meeting={this.meetingPreview()}/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		nickname: state.user.nickname,
	}
}

const mapDispatchToProps = dispatch => {
	return {	
		postMeetingRequest: (meeting) => {
			dispatch(actions.meeting.postMeetingRequest(meeting))
		},
		putMeetingRequest: (id, meeting) => {
			dispatch(actions.meeting.putMeetingRequest(id, meeting))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingForm)
