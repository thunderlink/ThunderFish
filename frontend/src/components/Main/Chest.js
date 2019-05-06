import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import './Chest.css'

class Chest extends Component {
	render() {
		return (
			<div className="chest">
				<div class="welcome">
					<div class="background_photo">
						<img
							src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
						/>	
					</div>
					<div class="content">
						<div class="description">
							<h2> 
								{"Alone, "}
								<br class="divider"/>
								{"Connected."}
							</h2>
							<p> 
								{"새 모임을 만들거나, "}
								<br class="divider"/> 
								{"기존 모임에 참여해보세요."}
							</p>
						</div>
						<div class="buttons">
							<button> 
								Sign in 
							</button>
							<button> Sign up </button>
						</div>
					</div>
					<div class="signup">
					</div>
				</div>
			</div>
		)
	}
}

export default Chest;

