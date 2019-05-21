import React, { Component } from 'react'

import './Chest.css'

class Chest extends Component {
	onClickSignin = (e) => {
		e.preventDefault()
		this.props.history.push("/signin/")
	}

	onClickSignup = (e) => {
		e.preventDefault()
		this.props.history.push("/signup/")
	}

	render() {
		return (
			<div className="chest">
				<div className="welcome">
					<div className="background_photo">
						<img
							src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
							alt="welcome"
						/>	
					</div>
					<div className="content">
						<div className="description">
							<h2> 
								{"Alone, "}
								<br className="divider"/>
								{"Connected."}
							</h2>
							<p> 
								{"새 모임을 만들거나, "}
								<br className="divider"/> 
								{"기존 모임에 참여해보세요."}
							</p>
						</div>
						<div className="buttons">
							<button
								onClick={this.onClickSignin}
							> 
								Sign in 
							</button>
							<button
								onClick={this.onClickSignup}
							> 
								Sign up 
							</button>
						</div>
					</div>
					<div className="signup">
					</div>
				</div>
			</div>
		)
	}
}

export default Chest;

