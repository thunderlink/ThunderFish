import React, { Component } from 'react'

class MeetingAddPage extends Component {
	render() {
		return(
			<div className="meeting_add_page">
				<fieldset>
					<form>
						<p>
							<h2> 사진 </h2>
							<input
								type="file" id="photo"
							/>
						</p>
						<p>
							<h2> 번개 이름 </h2>
							<input 
								type="text" id="meetingName"
								placeHolder="번개의 이름을 입력하세요."
							/>
						</p>
						<p>
							<h2> 날짜 </h2>
							<input 
								type="date" id="meetingDate"
								placeHolder="날짜를 선택하세요.."
							/>
						</p>
						<p>
							<h2> 신청 마감일 </h2>
							<input
								type="date" id="dueDate"
							/>
						</p>
						<p>
							<h2> 위치 </h2>
							<input
								type="text" id="location"
							/>
						</p>
						<p>
							<h2> 내용 </h2>
							<input
								type="text" id="detail"
							/>
						</p>
						<p>
							<h2> 태그 </h2>
							<input
								type="text" id="tag"
							/>
						</p>
					</form>
				</fieldset>
			</div>
		)
	}
}


export default MeetingAddPage
