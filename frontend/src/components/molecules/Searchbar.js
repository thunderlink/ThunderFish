import React, { Component } from 'react'
import logo from "../../logos/logo_renewal.png"
import search_button from '../../icons/search-button.png'
import './Searchbar.css'

import { Route, withRouter } from 'react-router'

class Searchbar extends Component {

	state = {
		query: "",
	}

	onClickLogo = (e) => {
		e.preventDefault()
		this.props.history.push(`/`)
	}

	onSubmitSearch = (e) => {
		e.preventDefault()
		this.props.history.push(`/search/${this.state.query}`)
	}

	componentDidMount() {
		this.setState({
			query: this.props.searchText
		})
	}

	render() {
		return (
			<div className="searchbar">
				<div class="content">
					<div class="logo">
						<img 
							src={logo}
							alt="Thunderfish_logo_with_text"
							onClick={this.onClickLogo}
						/>
				</div>
					<div class="search">
						<form class="search_form"
							onSubmit={this.onSubmitSearch}
						>
							<div class="input_wrapper">
								<input
									type="text"
									id="search_input"
									onChange={e => this.setState({query: e.target.value})}
								/>
							</div>
							<img 
								src={search_button}
								alt="search-button"
								onClick={this.onSubmitSearch}
							/>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
}

export default Searchbar
