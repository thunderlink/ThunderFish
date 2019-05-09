import React, { Component } from 'react'
import small_logo from '../../logos/small_logo.png'
import './Footer.css'

class Footer extends Component {
	render() {
		return (
			<div className="foot">
				<p className="description"> 
					<a> This site was made by </a>
					<a href="https://github.com/thunderlink"> thunderlink</a>
					<a>, as a project of swpp, course of SNU.</a>
				</p>
				<p className="description">
					<a>Source cord can be found on </a>
					<a href="https://github.com/thunderlink/ThunderFish">
						here
					</a>
					<a>.</a>
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
