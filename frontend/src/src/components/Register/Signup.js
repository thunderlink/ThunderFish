import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'

import SignupSuccess from './SignupSuccess'

import './Register.css'

class Signup extends Component {
	state = {
		username: '',
		password: '',
		name: '',
		nickname: ''
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.props.signupRequest({
			username: this.state.username,
			password: this.state.password,
			name: this.state.name,
			nickname: this.state.nickname
		})

	}

	render() {
		return(
			(this.props.isAuthenticated) ? (
				<Redirect to="/" />
			) : (this.props.signupSuccess) ? (
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
									onChange={(e)=>this.setState({name: e.target.value})}
								/>
							</div>
							<div>
								<h2> 닉네임 </h2>
								<input
									type="text" id="nickname"
									placeholder="닉네임을 입력해주세요."
									className = "text_field"
									onChange={(e)=>this.setState({nickname: e.target.value})}
								/>
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
		signupSuccess: state.user.signupSuccess,
		isAuthenticated: state.user.isAuthenticated
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

