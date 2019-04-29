import React, { Component } from 'react'
import './Toolbar.css'
import app_logo from '../../logos/app_logo.png'
import icon2 from '../../icons/icons-02.png'
import icon3 from '../../icons/icons-03.png'
import icon4 from '../../icons/icons-04.png'
import icon5 from '../../icons/icons-05.png'
import icon6 from '../../icons/icons-06.png'

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
							<li>
								<a href="/notfound">
									<img
										src={icon2}
										alt="Notification_icon"
										height={30}
									/>
								</a>
							</li>
							<li>
								<a href="/mypage">
									<img
										src={icon3}
										alt="Mypage_icon"
										height={30}
									/>
								</a>
							</li>
							<li>
								<a href="/mypage/meetings">
									<img
										src={icon4}
										alt="Mymeeting_icon"
										height={30}
									/>
								</a>
							</li>
							<li>
								<a href="/meetings/add">
									<img
										src={icon5}
										alt="Addmeeting_icon"
										height={30}
									/>
								</a>
							</li>
							<li>
								<a href="/">
									<img
										src={icon6}
										alt="Signout_icon"
										height={30}
									/>
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
