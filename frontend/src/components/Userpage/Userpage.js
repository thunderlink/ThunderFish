import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Userdetail from './Userdetail'
import Useredit from './Useredit'
import Meetinglist from './Meetinglist'
import Searchbar from '../molecules/Searchbar'
import ImageBox from '../molecules/ImageBox'

import report from '../../icons/report-button.png'
import edit from '../../icons/edit-button.png'

import "./Userpage.css"
class Userpage extends Component {


	render() {
		const user = {
			name: "김동우",
			detail: "소개원실 넘모 어려워요",
			photo: "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/36048268_2127048274176189_8193503050380345344_n.jpg?_nc_cat=107&_nc_ht=scontent-icn1-1.xx&oh=4117c5946b744d48663e5225d3de0fbd&oe=5D70B5C9"
		}
		return (
			<div className="user_page">
				<Searchbar {...this.props} />
				<div class="head">
					<div class="profile_name">
						<div class="image_wrapper">
							<ImageBox src={user.photo}/>	
						</div>
						<div class="content">
							<div class="userdtail">
								<p class="username"> {user.name}#{this.props.match.params.id} </p>
								<p class="description"> {user.detail} </p>
							</div>
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
