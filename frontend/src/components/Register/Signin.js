import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

class Signin extends Component {
	render() {
		return (
			<form className="register">
				<fieldset className="field">
					<legend>
						Sign in
					</legend>
					<div className="reg_form">
						<p>
							<h2> ID </h2>
							<input
								type="text" id="username"
								placeHolder="ID를 입력하세요"
							/>
						</p>
						<p>
							<h2> Password </h2>
							<input
								type="password" id="password"
								placeHolder="패스워드를 입력하세요"
							/>
						</p>
						<p>
							<button type="submit">로그인</button>
						</p>
					</div>
					<p className="description">
						<p>아직 계정이 없으신가요? </p>
						<Link to="/signup/"> 여기</Link>
						<a>를 눌러 새로운 계정을 만드세요!</a>
					</p>
				</fieldset>	
			</form>
		)
	}
}

export default Signin
