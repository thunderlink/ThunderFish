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
						<div>
							<h2> ID </h2>
							<input
								className="text_field"
								type="text" id="username"
								placeholder="ID를 입력하세요"
							/>
						</div>
						<div>
							<h2> Password </h2>
							<input
								className="text_field"
								type="password" id="password"
								placeholder="패스워드를 입력하세요"
							/>
						</div>
						<div>
							<p />
							<button type="submit">로그인</button>
						</div>
					</div>
					<div className="description">
						<p>아직 계정이 없으신가요? </p>
						<Link to="/signup/"> 여기</Link>
						{"를 눌러 새로운 계정을 만드세요!"}
					</div>
				</fieldset>	
			</form>
		)
	}
}

export default Signin
