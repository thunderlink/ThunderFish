import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from 'store/actions'

class MeetingAddPage extends Component {
	state = {
		photo: '',
		name: '',
		date: '',
		max_participant: 0,
		deadline: '',
		region: '',
		content: '',
		tag: '',
		open_chat: '',
	}

	constructor(props) {
		super(props)
		this.props.waitRequest();
	}

	meetingSerializer = () => {
		return {
			//photo: this.state.photo,
			name: this.state.name,
			date: this.state.date,
			max_participant: this.state.max_participant,
			deadline: this.state.deadline,
			region: this.state.region,
			content: this.state.content,
			tag: this.state.tag,
			open_chat: this.state.open_chat
		}
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.props.postMeetingRequest(this.meetingSerializer())
	}
	

	render() {
		return (this.props.postDone) ? (
			<Redirect to={`/meeting/${this.props.meetingElement.id}/`} />
		) : (
			<div className="meeting_add_page">
				<fieldset onSubmit={this.onSubmitHandler}>
					<form>
						<div>
							<h2> 사진 </h2>
							<input
								type="file" id="photo" onChange={(e)=>this.setState(/* TODO */)}
							/>
						</div>
						<div>
							<h2> 번개 이름 </h2>
							<input 
								type="text" id="meetingName"
								placeholder="번개의 이름을 입력하세요."
								onChange={(e)=>this.setState({name : e.target.value})}
							/>
						</div>
						<div>
							<h2> 날짜 </h2>
							<input 
								type="datetime-local" id="meetingDate"
								placeholder="날짜를 선택하세요.."
								onChange={(e)=>this.setState({date : e.target.value})}
							/>
						</div>
						<div>
							<h2> 신청 마감일 </h2>
							<input
								type="datetime-local" id="dueDate"
								onChange={(e)=>this.setState({deadline : e.target.value})}
							/>
						</div>
						<div>
							<h2> 최대 인원 </h2>
							<input
								type="number" id="maxParticipant"
								onChange={(e)=>this.setState({maxParticipant: e.target.value})}
							/>
						</div>
						<div>
							<h2> 위치 </h2>
							<input
								type="text" id="location"
								onChange={(e)=>this.setState({region : e.target.value})}
							/>
						</div>
						<div>
							<h2> 내용 </h2>
							<input
								type="text" id="detail"
								onChange={(e)=>this.setState({content : e.target.value})}
							/>
						</div>
						<div>
							<h2> 태그 </h2>
							<input
								type="text" id="tag"
								onChange={(e)=>this.setState({tag : e.target.value})}
							/>
						</div>
						<div>
							<h2> 채팅방 링크 </h2>
							<input
								type="text" id="open_chat"
								onChange={(e)=>this.setState({open_chat : e.target.value})}
								placeholder="To be added..."
							/>
						</div>
						<button type="submit"> 번개 만들기 </button>
					</form>
				</fieldset>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		postDone: state.meeting.postDone,
		meetingElement : state.meeting.meetingElement
	}
}

const mapDispatchToProps = dispatch => {
	return {
		postMeetingRequest : (meeting) => {
			dispatch(actions.meeting.postMeetingRequest(meeting))
		},
		waitRequest: () => {
			dispatch(actions.meeting.waitRequest())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MeetingAddPage)
