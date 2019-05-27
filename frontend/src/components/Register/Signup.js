import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import * as actions from '../../actions'

import SignupSuccess from './SignupSuccess'

import small_logo from '../../logos/small_logo.png'

import './Register.css'
import kakao_account_login_btn from '../../icons/kakao_account_login_btn.png'

class Signup extends Component {
	state = {
		email: '',
		password: '',
		name: '',
		nickname: ''
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.props.signupRequest({
			email: this.state.email,
			password: this.state.password,
			name: this.state.name,
			nickname: this.state.nickname
		})

	}

	render() {
		return(
			(this.props.isAuthenticated) ? (
				<Redirect to="/" />
			) : (this.props.signupStatus === 'SUCCESS') ? (
				<SignupSuccess />
			) : (

/**/

				<form className="register"
					onSubmit={this.onSubmitHandler}
				>
					<fieldset className="field">
						<Link
							to="/"
							className="field-logo-wrapper"
						>
							<img 
								className="field-logo"
								src={small_logo}
								height="48px"
								alt="thunderfish small logo"
							/>
						</Link>
						<div className="reg_form">
							<div>
								<h2> 이메일 </h2>
								<input
									type="email" id="email"
									placeholder="사용할 이메일을 입력해주세요."
									className="text_field"
									onChange={(e)=>this.setState({email: e.target.value})}
								/>
								{(this.props.signupStatus==="DUPLICATED") ? (
									<div className="dup_warning" >
										중복된 이메일입니다. <br />
										다른 이메일을  입력해주세요.
									</div>
								) : (
									<div />
								)}
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
							<hr />
							<div>
								<p />
								<button type="submit">가입하기</button>
							</div>
							<br/>
							혹은
							<br/>
							<div>
								<img
									src={kakao_account_login_btn}
									alt="kakao_account_login_btn"
									className="kakao_account_login_btn"
									onClick={this.onClickKakao}
								/>
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
		signupStatus: state.user.signupStatus,
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
