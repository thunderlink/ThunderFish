import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import './Register.css'

import kakao_account_login_btn from '../../icons/kakao_account_login_btn.png'

class Signin extends Component {
	state = {
		username: '',
		password: ''
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.props.signinRequest(
			this.state.username,
			this.state.password
		)
	}

	render() {
		return (
			(this.props.isAuthenticated) ? (
				<Redirect to="/"/>
			)
			: (
				/**/

				<form className="register"
					onSubmit={this.onSubmitHandler}
				>
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
									onChange={(e)=>this.setState({username: e.target.value})}
								/>
							</div>
							<div>
								<h2> Password </h2>
								<input
									className="text_field"
									type="password" id="password"
									placeholder="패스워드를 입력하세요"
									onChange={(e)=>this.setState({password: e.target.value})}
								/>
							</div>
							<div>
								<p />
								<button type="submit">로그인</button>
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
						<div className="description">
							<br/>
							아직 계정이 없으신가요? <br/>
							<Link to="/signup/"> 여기</Link>
							{"를 눌러 새로운 계정을 만드세요!"}
						</div>

					</fieldset>
				</form>
			)
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.user.isAuthenticated
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signinRequest: (username, password) => {
			dispatch(actions.user.signinRequest(username, password))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
