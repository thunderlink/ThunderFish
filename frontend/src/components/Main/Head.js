import React, { Component } from 'react'
import logo from "../../logos/logo_renewal.png"
import search_button from '../../icons/search-button.png'
import './Head.css'

class Head extends Component {
	render() {
		return (
			<div className="head">
				<div class="content">
					<div class="logo">
						<img 
							src={logo}
							alt="Thunderfish_logo_with_text"
						/>
				</div>
					<div class="search">
						<form class="search_form">
							<div class="input_wrapper">
								<input
									type="text"
									id="search_input"
								/>
							</div>
							<img 
								src={search_button}
								alt="search-button"
							/>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Head
