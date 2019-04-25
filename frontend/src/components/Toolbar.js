import React, { Component } from 'react'
import './Toolbar.css'
import app_logo from '../logos/app_logo.png'

class Toolbar extends Component {
	render() {
		return (
			<header className="toolbar">
				<nav className="toolbar__navigation">
					<div></div>
					<img 
						src={app_logo}
						alt="Thunderfish_app_logo"
						className="toolbar__logo"
						height={50}
					/>
					<div className="spacer"/>
					<div className="toolbar__navigation-items">
						<ul>
							<li><a href="/">Products</a></li>
							<li><a href="/">Users</a></li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

export default Toolbar
