import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../actions'

import './Register.css'
class SignupSuccess extends Component {

	componentWillUnmount() {
		console.log("quit");
		this.props.signupDone();
	}

	render() {
		return(
			<div className="register">
				<fieldset className="field">
					<legend>
						Welcome
					</legend>
					<h1> {`환영합니다, ${this.props.nickname}님!`} </h1>
					<p className="description"> 
						{'번개를 만들고 참여하기 위해 다시 '} 
						<Link to='/signin'>로그인</Link>
						{'해주세요. '}
					</p>	
				</fieldset>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		nickname: state.user.nickname
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signupDone: () => {
			dispatch(actions.user.signupDone())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupSuccess)
