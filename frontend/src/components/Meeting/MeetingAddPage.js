import React, { Component } from 'react'

class MeetingAddPage extends Component {
	state = {
		photo: '',
		name: '',
		date: '',
		max_participant: 0,
		deadline: '',
		region: '',
		photo: '',
		content: '',
		tag: '',
	}

	meetingSerializer = () => {
		return {
			photo: this.state.photo,
			name: this.state.name,
			date: this.state.date,
			max_participant: this.state.max_participant,
			deadline: this.state.deadline,
			region: this.state.region,
			photo: this.state.photo,
			content: this.state.content,
			tag: this.state.tag
		}
	}

	

	render() {
		return(
			<div className="meeting_add_page">
				<fieldset>
					<form>
						<div>
							<h2> 사진 </h2>
							<input
								type="file" id="photo"
							/>
						</div>
						<div>
							<h2> 번개 이름 </h2>
							<input 
								type="text" id="meetingName"
								placeholder="번개의 이름을 입력하세요."
							/>
						</div>
						<div>
							<h2> 날짜 </h2>
							<input 
								type="month" id="meetingDate"
								placeholder="날짜를 선택하세요.."
							/>
						</div>
						<div>
							<h2> 신청 마감일 </h2>
							<input
								type="datetime-local" id="dueDate"
							/>
						</div>
						<div>
							<h2> 위치 </h2>
							<input
								type="text" id="location"
							/>
						</div>
						<div>
							<h2> 내용 </h2>
							<input
								type="text" id="detail"
							/>
						</div>
						<div>
							<h2> 태그 </h2>
							<input
								type="text" id="tag"
							/>
						</div>
						<button type="submit"> 번개 만들기 </button>
					</form>
				</fieldset>
			</div>
		)
	}
}


export default MeetingAddPage
