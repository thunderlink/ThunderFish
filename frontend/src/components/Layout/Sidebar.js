import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import small_logo from 'logos/small_logo.png'
import add_meeting from 'icons/add-meeting.png'
import my_meeting from 'icons/my-meeting.png'
import my_page from 'icons/my-page.png'
import sign_out from 'icons/sign-out.png'
import sign_in from 'icons/sign-in.png'
import sign_up from 'icons/sign-up.png'
import list_button from 'icons/list-button.png'

import { Category } from 'components/category'

import './Sidebar.css'

const sidebar_items_user = [
	{name: "마이페이지", icon: my_page, link: '/user/'},
	{name: "번개 생성", icon: add_meeting, link: '/meeting/add/'},
	{name: "로그아웃", icon: sign_out, link: '/signout/'}
]

const sidebar_items_guest = [
	{name: "회원가입", icon: sign_up, link: '/signup/'},
	{name: "로그인", icon: sign_in, link: '/signin/'}
]

class Sidebar extends Component {
	state = {
		openedContent: 0,
	}

	render() {
		return (
			<aside className="major-sidebar">
				<Link 
					className="sidebar-logo"
					to="/"
				>
					<img
						src={small_logo}
						alt="Thunderfish Small Logo"
						className="logo-img"
					/>
					<h1 className="logo-text">
						ThunderFish
					</h1>
				</Link>
				<div className="sidebar-content">
					{((this.props.isAuthenticated) ? 
						sidebar_items_user :
						sidebar_items_guest
					).map(({name, icon, link}, index) => (
						<Link className="sidebar-item-grey"
							key={`${index}${name}`}
							to={(name=="마이페이지") ? `${link}${this.props.id}` : link}
						>
							<img
								src={icon}
								alt={name}
								className="item-logo"
							/>
							<h1 className="item-text" >
								{name}
							</h1>
						</Link>
					))}
					{
						Category.map((name, index) => {
							return(
								<div className="sidebar-item-black">
									<div 
										className="sidebar-item-black-big"
										onClick={(e)=>{
											(this.state.openedContent === index + 1) 
												?	this.setState({openedContent: 0})
												: this.setState({openedContent: index + 1})
										}}
									>
										<img
											src={list_button}
											className="list-toggle"
											style={{
												transform: (this.state.openedContent === index+1)
													? 'rotate(90deg)'
													: 'rotate(0deg)',
												transitionDuration: '0.3s',
												transitionProperty: 'transform',
											}}
										/>
										<h1 className="list-text">
											{name.big}	
										</h1>
									</div>
									<div
										className="sidebar-item-black-list"
										style={{
											'max-height': (this.state.openedContent === index+1) ? '1000px' : '0',
											transition: 'max-height 0.3s',
										}}
									> 
										{
											name.small.map(item => (
												<Link 
													className="sidebar-item-black-small"
													to={`/search/${item}/`}
												>
												<h1 className="list-text"> {item} </h1>
											</Link>
											))
										}
									</div>
								</div>
							)
						})
					}
				</div>
			</aside>
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
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
