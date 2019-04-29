import React, { Component } from 'react'
import './Register.css'

class Signup extends Component {
	render() {
		return(
			<form className="signup">
				<fieldset className="signup__field">
					<legend>
						Sign up
					</legend>
					<div className="signup__field-input">
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
							<h2> Check your password </h2>
							<input
								type="password" id="password-re"
							/>
						</p>
						<p>
							<button type="submit">Sign Up!</button>
						</p>
					</div>
				</fieldset>
			</form>
		)
	}
}

export default Signup

