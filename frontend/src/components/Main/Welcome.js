import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import my_meeting from 'icons/my-meeting.png'
import add_meeting from 'icons/add-meeting.png'
import sign_in from 'icons/sign-in.png'
import sign_up from 'icons/sign-up.png'

import './Welcome.css'

export default class Welcome extends Component{
	imgsrc = "https://cdn.pixabay.com/photo/2015/11/22/15/16/lightning-1056419_960_720.jpg"

	render() {
		return (
			<div className="welcome">
				<img
					src={this.imgsrc}
					className="welcome-pic"
					alt="welcome"
				/>
				{
					(this.props.isAuthenticated) ? (
						<div className="welcome-content">
							<h1> {`ThunderFish™에 돌아오신 것을 환영합니다!`} </h1>
							<p> <strong>{`${this.props.user}`}</strong>님, 새로운 번개를 생성하거나 참여해보세요. 
							</p>
							<div className="welcome-button-set">
								<Link to={`/user/${this.props.id}`} className="welcome-button">
									<img className="welcome-icon" src = {my_meeting} alt="my meeting"/>
									내 번개 보기
								</Link>
								<Link to={'/meeting/add/'} className="welcome-button">
									<img className="welcome-icon" src = {add_meeting} alt="add meeting"/>
									새 번개 생성
								</Link>
							</div>
						</div>
					) : (
						<div className="welcome-content">
							<h1> {`ThunderFish™에 오신 것을 환영합니다!`} </h1>
							<p> ThunderFish™에 가입하고 자유롭게 번개를 만들고 참여해보세요. </p>
							<div className="welcome-button-set">
								<Link to={`/signup/`} className="welcome-button">
									<img className="welcome-icon" src = {sign_up} alt="sign up"/>
									회원가입
								</Link>
								<Link to={'/signin/'} className="welcome-button">
									<img className="welcome-icon" src = {sign_in} alt="sign in"/>
									로그인
								</Link>
							</div>
						</div>
					)
				}
			</div>
		)
	}
}
