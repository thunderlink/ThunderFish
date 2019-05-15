import React, { Component } from 'react'
import './Register.css'

class Signup extends Component {
	render() {
		return(
			<form className="register">
				<fieldset className="field">
					<legend>
						Sign up
					</legend>
					<div className="reg_form">
						<p>
							<h2> ID </h2>
							<input
								type="text" id="username"
								placeHolder="사용할 ID를 입력해주세요."
							/>
						</p>
						<p>
							<h2> 비밀번호 </h2>
							<input
								type="password" id="password"
								placeHolder="비밀번호를 입력해주세요."
							/>
						</p>
						<p>
							<h2> 비밀번호 확인 </h2>
							<input
								type="password" id="password-re"
								placeHolder="비밀번호를 다시 입력해주세요."
							/>
						</p>
						<p>
							<button type="submit">가입하기</button>
						</p>
					</div>
				</fieldset>
			</form>
		)
	}
}

export default Signup

