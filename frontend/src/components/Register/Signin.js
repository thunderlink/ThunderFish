import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from 'components/Loading'
import * as actions from 'store/actions'

import small_logo from 'logos/small_logo.png'

import './Register.css'

class Signin extends Component {
	state = {
		username: '',
		password: '',
		submitError: false,
	}

	componentDidMount() {
		window.Kakao.Auth.createLoginButton({
			container : '#kakaoLogin',
			success : this.kakaoHandler,
			//fail : ,
		})
	}

	kakaoHandler = (object) => {
		this.props.kakaoLoginRequest(object);
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		if(this.checkSubmit()) {
		this.props.signinRequest(
			this.state.username,
			this.state.password
		)
		}
		else {
			this.setState({submitError: true})
		}
	}
	
	checkSubmit = () => {
		if(this.state.username.length === 0 || this.state.password.length === 0 || !this.state.username.includes('@'))
			return false;
		else
			return true; 
	}

	render() {
		return (
			(this.props.isAuthenticated || this.props.signinStatus === 'SUCCESS') ? (
				<Redirect to="/"/>
			) : (this.props.signinStatus === 'WAIT') ? (
				<Loading />
			) : (
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
						{
							(this.props.signinStatus==='FAILED') ? (
								<p> 잘못된 이메일 또는 패스워드입니다. </p>
							) : (
								null
							)
						}
						{
							(this.state.submitError) ? (
								<p> 올바른 이메일과 패스워드를 입력해주세요. </p>
							) : (
								null
							)
						}

						<div className="reg_form">
							<div>
								<h2> Email </h2>
								<input
									className="text_field"
									type="email" id="username"
									placeholder="이메일을 입력하세요."
									onChange={(e)=>this.setState({username: e.target.value})}
								/>
							</div>
							<div>
								<h2> Password </h2>
								<input
									className="text_field"
									type="password" id="password"
									placeholder="패스워드를 입력하세요."
									onChange={(e)=>this.setState({password: e.target.value})}
								/>
							</div>
							<hr />
							<div>
								<p />
								<button type="submit">로그인</button>
							</div>
							<br/>
							혹은
							<br/>
							<div id="kakaoLogin">
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
		signinStatus: state.user.signinStatus,
		isAuthenticated: state.user.isAuthenticated
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signinRequest: (username, password) => {
			dispatch(actions.user.signinRequest(username, password))
		},
		kakaoLoginRequest: (object) => {
			dispatch(actions.user.kakaoLoginRequest(object))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
