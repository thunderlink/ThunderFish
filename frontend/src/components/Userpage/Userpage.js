import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Userdetail from './Userdetail'
import Useredit from './Useredit'
import Meetinglist from './Meetinglist'

import report from '../../icons/report-button.png'
import edit from '../../icons/edit-button.png'

import "./Userpage.css"
class Userpage extends Component {

	render() {
		const username = "Anonymous"
		const detail = "Hello, world!"
		return (
			<div className="userpage">
				<div class="head">
					<div class="profile">
						<div class="photo_cutter">
							<img />
						</div>
					</div>
					<div class="content">
						<div class="userdtail">
							<p class="username"> {username}#{this.props.match.params.id} </p>
							<p class="description"> {detail} </p>
						</div>
					</div>
					<div class="badge">
						<div class="report_button">
							<img 
								src={report}
							/>
							<p> Report </p>
						</div>
						<div class="edit_button">
							<img
								src={edit}
							/>
							<p> Edit </p>
						</div>
					</div>			
				</div>
				<div class="usertab">
					<ul class="list">
						<li> Detail </li>
						<li> Meetings </li>
					</ul>
					<div class="spacer" />
				</div>
				<div class="content">
					<Userdetail />
					<Meetinglist />
				</div>
			</div>
		)
	}

}

export default Userpage
