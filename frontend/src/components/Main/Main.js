import React, { Component } from 'react'
import logo from '../../logos/logo_renewal.png'
import search_button from '../../icons/search-button.png'
import small_logo from '../../logos/small_logo.png'
import './Main.css'

class Main extends Component {
	render() {
		return (
			<div className="wrapper">
				<div className="header">
					<div class="header-cont">
						<div class="logo">
							<img 
								src={logo}
								alt="Thunderfish_logo_with_text"
							/>
					</div>
						<div class="search">
							<form class="search_form">
								<input
									type="text"
									id="search_input"
								/>
								<img 
									src={search_button}
									alt="search-button"
								/>
							</form>
						</div>
					</div>
				</div>
				<div className="chest">
					<div class="welcome">
						<div class="background_photo">
							<img
								src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
							/>
						</div>
						<div class="content">
							<div class="description">
								<h2> Welcome to ThunderFish!</h2>
								<p> Enjoy amazing meetings. </p>
							</div>
							<div class="buttons">
								<button> Sign in </button>
								<button> Sign up </button>
							</div>
						</div>
						<div class="signup">
						</div>
					</div>
				</div>
				<div className="leg">
				</div>
			</div>
		)
	}
}

export default Main
