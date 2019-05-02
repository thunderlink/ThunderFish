import React, { Component } from 'react'
import './Meetingpage.css'

class Meetingpage extends Component {
	render() {
		const meeting = {
			name: "컴개실 부수기",
			host: "컴공17",
			date: "2019년 5월 5일 7시 30분",
			participant: ["이성찬", "서준원", "박종호", "김동우"],
			waiter: ["연태영", "차승빈"],
			max_participant: 17,
			deadline: "2019년 5월 1일",
			region: "서울특별시 관악구 관악로 1 301동 314호",
			photo: "",
			content: "컴개실 파란책 1회독, 연습문제 풀이 300문제, System Programming 예습",
			status: 1,
			open_chat: "",
			tag: ["전공", "코딩", "서울대학교", "컴개실"],
			comment: [
				{id:"이성찬", text:"ㅋㅋㅋㅋㅋㅋㅋㅋㅋ"},
				{id:"서준원", text:"공부하자"},
				{id:"박종호", text:"집갈거임"}
			]
		}

		return (
			<div className="meeting_page">
				<div class="header">
					<div class="header_left">
						<div class="title">
							<h1> {meeting.name} </h1>
						</div>
						<div class="photo">
							<div class="photo_cutter">
								<img />
							</div>
						</div>
					</div>
					<div class="content">
						<h3> 호스트 </h3>
						<div class="host_info">
							<p> {meeting.host} </p>
							<p> User info </p>
						</div>
						<h3> 번개 날짜 </h3>
						<p> {meeting.date} </p>
						<h3> 모집 마감 </h3>
						<p> {meeting.deadline} </p>
						<h3> 위치 </h3>
						<p> {meeting.region} </p>
					</div>
				</div>
				<div class="description">
					<h2> 번개 내용 </h2>
					<hr />
					<p> {meeting.content} </p>
					<h2> 태그 </h2>
					<hr/>
					<ul>
						{meeting.tag.map(item => (
							<li>
								<a> #{item} </a>
								<a> {" "} </a>
							</li>
						))}
					</ul>
					<h2> 지도 </h2>
					<hr/>
					<div class="map">
					</div>
				</div>
				<div class="comments">
					<h2> 댓글 </h2>
					<hr />
					<ul>
						{meeting.comment.map(item =>
							<li>
								<h3> {item.id} </h3>
								<p> {item.text} </p>
							</li>
							)}
					</ul>
				</div>
			</div>
		)
	}
}

export default Meetingpage

