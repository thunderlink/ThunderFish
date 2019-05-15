import React, { Component } from 'react'

import './Toolbar.css'

import small_logo from '../../logos/small_logo.png'

class Toolbar extends Component {

	state = {
		nav: "Notification",
		user: 0
	}

	onClickLogo = (e) => {
		e.preventDefault()
		this.props.history.push("/")
	}

	onHoverLink = (id) => (e) => {
		e.preventDefault()
		this.setState({nav: id})
	}

	onClickLink = (e) => {
		e.preventDefault()
		this.props.history.push(this.state.nav)
	}

	render() {
		return (
			<header className="toolbar">
				<div className="toolbar__navigation">
					<div></div>
					<img 
						src={small_logo}
						alt="Thunderfish_app_logo"
						className="toolbar__logo"
						height={50}
						onClick={this.onClickLogo}
					/>
					<div className="spacer"/>
					<div className="toolbar__navigation-items">
						<ul>
							<li
								onMouseOver={this.onHoverLink("/notification")}
								onClick={this.onClickLink}
							>
								Notification
							</li>
							<li
								onMouseOver={this.onHoverLink(`/user/${this.state.user}`)}
								onClick={this.onClickLink}
							>
								My Page
							</li>
							<li
								onMouseOver={this.onHoverLink("/meeting/add")}
								onClick={this.onClickLink}
							>
								Add Meeting
							</li>
							<li
								onMouseOver={this.onHoverLink("/")}
								onClick={this.onClickLink}
							>
								Sign Out
							</li>
						</ul>
					</div>
				</div>
			</header>
		)
	}
}

export default Toolbar
