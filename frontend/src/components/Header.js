import React, { Component } from 'react'

import menu_button from '../icons/menu-button.png'
import search_button from '../icons/search-button.png'

import './Header.css'

export default class Header extends Component {

	state = {
		query: ''
	}

	constructor(props) {
		super(props);
		let param = this.props.match.params.query;
		this.state.query = (param === undefined) ? '' : param;
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

	render() {
		return (
			<nav className="major-header">
				<button 
					onClick={this.onClickMenu}
					className="menu-button-wrapper">
					<img
						src={menu_button}
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
				<div className="spacer" />
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
