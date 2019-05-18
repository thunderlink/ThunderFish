import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import SignupSuccess from './SignupSuccess'

import './Register.css'

class Signup extends Component {
	state = {
		username: '',
		password: '',
		name: '',
		nickname: '',
		gender: ''
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.props.signupRequest({
			username: this.state.username,
			password: this.state.password,
			name: this.state.name,
			nickname: this.state.nickname,
			gender: this.state.gender
		})
	}

	render() {
		return(
			(this.props.signupSuccess) ? (
				<SignupSuccess />
			)
			: (
				<form className="register"
					onSubmit={this.onSubmitHandler}
				>
					<fieldset className="field">
						<legend>
							Sign up
						</legend>
						<div className="reg_form">
							<div>
								<h2> ID </h2>
								<input
									type="text" id="username"
									placeholder="사용할 ID를 입력해주세요."
									className="text_field"
									onChange={(e)=>this.setState({username: e.target.value})}
								/>
							</div>
							<div>
								<h2> 비밀번호 </h2>
								<input
									type="password" id="password"
									placeholder="비밀번호를 입력해주세요."
									className = "text_field"
									onChange={(e)=>this.setState({password: e.target.value})}
								/>
							</div>
							<div>
								<h2> 비밀번호 확인 </h2>
								<input
									type="password" id="password-re"
									placeholder="비밀번호를 다시 입력해주세요."
									className = "text_field"
								/>
							</div>
							<div>
								<h2> 이름 </h2>
								<input
									type="text" id="realname"
									placeholder="본명을 입력해주세요."
									className = "text_field"
									onChange={(e)=>this.setState({nickname: e.target.value})}
								/>
							</div>
							<div>
								<h2> 별명 </h2>
								<input
									type="text" id="nickname"
									placeholder="별명을 입력해주세요."
									className = "text_field"
									onChange={(e)=>this.setState({nickname: e.target.value})}
								/>
							</div>
							<div>
								<h2> 성별 </h2>
								<div className="gender_select">
									<div className="radio_field">
										<input
											type="radio" name="gender"
											value="male"
											onChange={(e)=>this.setState({gender: "GENDER_MALE"})}
										/> 남성
									</div>
									<div className="radio_field">
										<input
											type="radio" name="gender"
											value="female"
											onChange={(e)=>this.setState({gender: "GENDER_FEMALE"})}
										/> 여성
									</div>
								</div>
							</div>
							<div>
								<p />
								<button type="submit">가입하기</button>
							</div>
						</div>
					</fieldset>
				</form>
			)
		)
	}
}

const mapStateToProps = state => {
	return {
		signupSuccess: state.user.signupSuccess
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signupRequest: (user) => {
			dispatch(actions.user.signupRequest(user))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

