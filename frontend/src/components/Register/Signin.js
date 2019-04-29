import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

class Signin extends Component {
	render() {
		return (
			<form className="signin">
				<fieldset className="signin__field">
					<legend>
						Sign in
					</legend>
					<div className="signin__field-input">
						<p>
							<h2> Username </h2>
							<input
								type="text" id="username"
							/>
						</p>
						<p>
							<h2> Password </h2>
							<input
			         type="password" id="password"
							/>
						</p>
						<p>
							<button type="submit">Sign in</button>
						</p>
					</div>
					<p className="signin__field-text">
						<a>Still not have an account? </a>
						<Link to="/signup/"> Sign up</Link>
						<a> for amazing meetings!</a>
					</p>
				</fieldset>	
			</form>
		)
	}
}

export default Signin
