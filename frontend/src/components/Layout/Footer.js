import React, { Component } from 'react'
import small_logo from '../../logos/small_logo.png'
import './Footer.css'

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<p className="description"> 
					{"This site was made by "}
					<a href="https://github.com/thunderlink"> thunderlink</a>
					{", as a project of swpp, course of SNU."}
				</p>
				<p className="description">
					{"Source code can be found on "}
					<a href="https://github.com/thunderlink/ThunderFish">
						here
					</a>
					{"."}
				</p>
				<p>
					<img
						className="logo"
						src={small_logo}
						alt="Thunderfish_small_logo"
					/>
				</p>
			</div>
		)
	}
}

export default Footer
