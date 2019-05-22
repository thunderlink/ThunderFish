import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Userdetail from './Userdetail'
import Meetinglist from './Meetinglist'
import SearchBar from '../molecules/SearchBar'
import ImageBox from '../molecules/ImageBox'

import * as actions from '../../actions'

import report from '../../icons/report-button.png'
import edit from '../../icons/edit-button.png'

import "./Userpage.css"
class Userpage extends Component {

	constructor(props) {
		super(props)
		this.props.getUserRequest(this.props.match.params.id)
	}

	render() {
		return (this.props.user == null) ?
			(<div> Loading... </div>) :
		(
			<div className="user_page">
				<Route component={SearchBar} />
				<div className="head">
					<div className="profile_name">
						<div className="image_wrapper">
							<ImageBox 
								src={this.props.user.photo}
								alt="profile image" 
							/>	
						</div>
						<div className="content">
							<div className="userdtail">
								<p className="username"> {this.props.user.nickname}#{this.props.match.params.id} </p>
								<p className="description"> {this.props.user.introduce} </p>
							</div>
						</div>
					</div>
					<div className="badge">
						<div className="report_button">
							<img 
								src={report}
								alt="report button"
							/>
							<p> Report </p>
						</div>
						<div className="edit_button">
							<img
								src={edit}
								alt="edit button"
							/>
							<p> Edit </p>
						</div>
					</div>			
				</div>
				<div className="usertab">
					<ul className="list">
						<li> Detail </li>
						<li> Meetings </li>
					</ul>
					<div className="spacer" />
				</div>
				<div className="content">
					<Userdetail />
					<Meetinglist />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getUserRequest: (user) => {
			dispatch(actions.user.getUserRequest(user))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Userpage)
