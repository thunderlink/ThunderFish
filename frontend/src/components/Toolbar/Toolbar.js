import React, { Component } from 'react'
import './Toolbar.css'
import small_logo from '../../logos/small_logo.png'

class Toolbar extends Component {
	render() {
		return (
			<header className="toolbar">
				<nav className="toolbar__navigation">
					<div></div>
					<img 
						src={small_logo}
						alt="Thunderfish_app_logo"
						className="toolbar__logo"
						height={50}
					/>
					<div className="spacer"/>
					<div className="toolbar__navigation-items">
						<ul>
							<li>
								<a href="/notfound">
									Notification
								</a>
							</li>
							<li>
								<a href="/user">
									My Page	
								</a>
							</li>
							<li>
								<a href="/user/meetings">
									My Meetings	
								</a>
							</li>
							<li>
								<a href="/meetings/add">
									Add Meeting	
								</a>
							</li>
							<li>
								<a href="/">
									Sign Out
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

export default Toolbar
