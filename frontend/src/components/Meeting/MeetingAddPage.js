import React, { Component } from 'react'

class MeetingAddPage extends Component {
	state = {
		name: '',
		date: '',
		max_participant: 0,
		deadline: '',
		region: '',
		photo: '',
		content: '',
		tag: '',
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
								type="date" id="meetingDate"
								placeholder="날짜를 선택하세요.."
							/>
						</div>
						<div>
							<h2> 신청 마감일 </h2>
							<input
								type="date" id="dueDate"
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
					</form>
				</fieldset>
			</div>
		)
	}
}


export default MeetingAddPage
