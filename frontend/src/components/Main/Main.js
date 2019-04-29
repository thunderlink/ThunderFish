import React, { Component } from 'react'
import top_logo_blue from '../../logos/top_logo-blue.png'
import './Main.css'

class Main extends Component {
	render() {
		return (
			<div>
				<p>
					<img 
						src={top_logo_blue}
						alt="Thunderfish_logo_with_text"
						width={400}
					/>
				</p>
				<p>
					<div className="search__box">
						<form className="search__box-cont">
							<input
								type="text"
								id="search_input"
							/>
							<button type="submit">Search</button>
						</form>
					</div>
				</p>
			</div>
		)
	}
}

export default Main
