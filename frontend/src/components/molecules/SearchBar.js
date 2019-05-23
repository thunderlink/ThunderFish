import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import logo from "../../logos/logo_renewal.png"
import search_button from '../../icons/search-button.png'

import './SearchBar.css'

class SearchBar extends Component {

	state = {
		query: '',
	}	
	
	constructor(props){
		super(props);
		let param = this.props.match.params.query
		this.state.query = (param == undefined) ? '' : param
	}

	componentDidMount() {
		//this.state.query = this.props.match.params.query
	}

	onClickLogo = (e) => {
		e.preventDefault()
		this.props.history.push(`/`)
	}

	onSubmitSearch = (e) => {
		e.preventDefault()
		this.props.history.push(`/search/${(this.state.query).replace("/", " ")}`)
	}

	render() {
		return (
			<div className="searchbar">
				<div className="content">
					<div className="logo">
						<img 
							src={logo}
							alt="Thunderfish_logo_with_text"
							onClick={this.onClickLogo}
						/>
				</div>
					<div className="search">
						<form className="search_form"
							onSubmit={this.onSubmitSearch}
						>
							<div className="input_wrapper">
								<input
									type="text"
									id="search_input"
									onChange={e => this.setState({query: e.target.value})}
									value={this.state.query}
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
	return {
		query: state.meeting.searchText,
		option: state.meeting.searchOption,
		token: state.user.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getMeetingListRequest : () => {
			dispatch(actions.meeting.getMeetingListRequest(this.props.query, this.props.token))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
