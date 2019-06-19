import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import DateSelector from 'components/molecules/DateSelector'
import MeetingDetail from './MeetingDetail'
import { KakaoSelectMap } from 'components/molecules/KakaoMap'

import * as actions from 'store/actions/'

import 'react-datepicker/dist/react-datepicker.css'
import './MeetingForm.css'

class MeetingForm extends Component {

	state = {
		file: null,
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

		dateError: false,
		wrongDateError: false,
		locationError: false,
		nameError: false,
		maxError: false,
	}

	constructor(props){
		super(props)
		if(this.props.functionType==="PUT") {
			let tags = ''
			Object.keys(this.props.meeting.tag_set).map(key => {
				tags = tags + this.props.meeting.tag_set[key] + " "
				return ""
			})
			this.state = {
				file: null,
				preview: this.props.meeting.pic_url,
				name: this.props.meeting.name,
				date: this.props.meeting.date,
				max_participant: this.props.meeting.max_participant,
				deadline: this.props.meeting.deadline,
				region: this.props.meeting.region,
				content: this.props.meeting.content,
				tag: tags,
				open_chat: this.props.meeting.open_chat,
				latitude: this.props.meeting.latitude,
				longitude: this.props.meeting.longitude,
				originalPhoto: this.props.meeting.photo
			}
			this.state.preview = this.props.meeting.pic_url
		}
		else {
			this.state = {
				file: null,
				preview: '',
				name: '',
				date: new Date(),
				max_participant: 0,
				deadline: new Date(),
				region: '',
				latitude: 37.46001,
				longitude: 126.95126,
				content: '',
				tag: '',
				open_chat: '',
			}
		}
	}

	meetingSerializer = () => {
		return {
			photo: this.state.file,
			originalPhoto: this.state.originalPhoto,
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
			pic_url: this.state.preview,
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
		if(this.checkSubmit()) {
			if(this.props.functionType==="POST")
				this.props.postMeetingRequest(this.meetingSerializer())
			else
				this.props.putMeetingRequest(this.props.meeting.id, this.meetingSerializer())
		}
	}

	checkSubmit = () => {
		let flag = true;
		if(this.state.name.length === 0) {
			this.setState({nameError: true});
			flag = false;
		}
		else this.setState({nameError: false});

		if(!moment(this.state.deadline).isValid() || !moment(this.state.date).isValid()) {
			this.setState({wrongDateError: true});
			flag = false;
		}	
		else this.setState({wrongDateError: false});

		if(moment(this.state.deadline).isAfter(this.state.date)) {
			this.setState({dateError: true})
			flag = false;
		}
		else this.setState({dateError: false});

		if(this.state.max_participant <= 0) {
			this.setState({maxError: true});
			flag = false;
		}
		else this.setState({maxError: false});
		
		if(this.state.region.length === 0) {
			this.setState({locationError: true})
			flag = false;
		}
		else this.setState({locationError: false});
		
		return flag;	
	}

	onChangePlace = (newState) => {
		this.setState(newState)
	}

	onChangeDate = (date) => {
		this.setState({date: date})
	}	
	
	onChangeDeadline = (date) => {
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
						{(this.state.nameError) ? (
							<p className='meeting-warning-message'> 
								번개 이름을 입력해주세요. 
							</p>
						) : (
							null
						)}
					</form>
					<div className="input-item">
						<p className="input-item__title"> 날짜 </p>
						<div className="input-item__date">
							<DateSelector
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>
					<div className="input-item">
						<p className="input-item__title"> 신청 마감일 </p>
						<div className="input-item__date">
							<DateSelector
								selected={this.state.deadline}
								onChange={this.onChangeDeadline}
							/>					
						</div>
					</div>
					{(this.state.wrongDateError) ? (
						<p className='meeting-warning-message'>
							올바른 날짜 형식이 아닙니다.
						</p>
					) : (this.state.dateError) ? (
						<p className='meeting-warning-message'> 
							신청 마감일이 번개 날짜보다 늦습니다.
						</p>
					) : (
						null
					)}
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
						{(this.state.maxError) ? (
							<p className='meeting-warning-message'> 
								최대 인원수는 1명 이상이어야 합니다.
							</p>
						) : (
							null
						)}	
					</form>
					<div className="input-item">
						<p className="input-item__title"> 위치 </p>
						<div className="map-wrapper">
							<KakaoSelectMap
								onChangePlace={this.onChangePlace}
								latitude={this.state.latitude}
							longitude={this.state.longitude}
								region={this.state.region}
								enableRegion={true}
							/>
						</div>
					</div>
					{(this.state.locationError) ? (
						<p className='meeting-warning-message'> 
							상세 위치를 적어주세요.
						</p>
					) : (
						null
					)}					
					<form onSubmit={this.onSubmitHandler}>
						<div className="input-item">
							<p className="input-item__title"> 내용 </p>
							<textarea
								className="input-item__textarea" 
								type="text" id="detail" value={this.state.content}
								onChange={(e)=>this.setState({content : e.target.value})}
								placeholder="번개에 대한 설명을 자세히 적어주세요."
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
						{/*
						<div className="input-item">
							<p className="input-item__title"> 채팅방 링크 </p>
							<input
								className="input-item__input"
								type="text" id="open_chat" value={this.state.open_chat}
								onChange={(e)=>this.setState({open_chat : e.target.value})}
								placeholder="카카오 오픈채팅 생성 후, 주소를 입력해주세요."
							/>
						</div>
						*/}
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
					<MeetingDetail meeting={this.meetingPreview()} type="preview"/>
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
