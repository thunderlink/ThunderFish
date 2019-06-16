import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import * as actions from 'store/actions'

import menu_button from 'icons/menu-button.png'
import search_button from 'icons/search-button.png'
import notification_button from 'icons/notification-button.png'

import NotificationList from 'components/molecules/Notification/NotificationList'

import './Header.css'

class Header extends Component {

	state = {
		query: '',
		openNotification: false
	}

	constructor(props) {
		super(props);
		this.props.userSetRequest();
		let param = this.props.match.params.query;
		this.state.query = (param === undefined) ? '' : param;
		this.state.openNotification = false
	}

	onSubmitSearch = (e) => {
		e.preventDefault();
		this.props.history.push(`/search/${(this.state.query).replace('/', ' ')}`)
	}

	onClickMenu = (e) => {
		e.preventDefault();
		e.stopPropagation();

		document.querySelector('.major-sidebar')
			.classList.toggle('major-sidebar--open')
	}

	handleClick = (e) => {
		if(this.state.openNotification) {
			document.removeEventListener('click', this.handleOutsideClick, false)
		}
		else {
			this.props.getNotification(this.props.id);
			document.addEventListener('click', this.handleOutsideClick, false)
		}
		this.setState(prevState => ({
			openNotification: !prevState.openNotification
		}))
	}

	handleOutsideClick = (e) => {
		this.handleClick()
	}

	render() {
		return (
			<nav className="major-header">
				<button 
					onClick={this.onClickMenu}
					className="menu-button-wrapper">
					<img
						src={menu_button}
						alt="menu button"
					/>
				</button>
				<div className="search-bar">
					<form 
						className="search-bar__form"
						onSubmit={this.onSubmitSearch}
					>
						<img
							src={search_button}
							type="submit"
							alt="search button"
						/>
						<div className="input-wrapper">
							<input
								type="text"
								id="search-input"
								onChange={(e)=>this.setState({query: e.target.value})}
							/>
						</div>
					</form>
				</div>
				{
					(this.props.isAuthenticated) ? (
						<div className="notification-wrapper">
							<div className="notification-content-wrapper" ref={node => {this.node = node}}>
								{
									(this.state.openNotification) 
										? (<Route component={NotificationList} />)
										: (null)
								}
							</div>
							<button
								onClick={this.handleClick}
								className="menu-button-wrapper"
							>
								<img
									src={notification_button}
									alt="notification button"
								/>								
							</button>
						</div>
					) : (
						null
					)
				}
				<div className="image-cutter">
					<img
						src="https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/36048268_2127048274176189_8193503050380345344_n.jpg?_nc_cat=107&_nc_ht=scontent-icn1-1.xx&oh=d6b94c008180ddcea752af00d31ceab7&oe=5D9842C9"
						alt="profile image"
						className="profile-photo"
					/>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.user.isAuthenticated,
		id: state.user.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getNotification: (id) => {
			dispatch(actions.notification.getNotificationRequest(id))
		},
		userSetRequest: () => {
			dispatch(actions.user.userSetRequest());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
