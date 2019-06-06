import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ImageBox from 'components/molecules/ImageBox'

import report from 'icons/report-button.png'
import edit from 'icons/edit-button.png'
import default_profile from 'icons/default-profile.png'

import './UserDetail.css'

class UserDetail extends Component {
	render() {
		return(
			<div className="user-detail">
				{console.log(this.props.user)}
				<div className="profile-body">
					<div className="body-left">
						<div className="image-wrapper">
							<ImageBox
								default={default_profile}
								src={this.props.user.photo}
								alt="profile image" 
							/>	
						</div>
						<div className="button-set">
							{
								(this.props.id==this.props.user.id) ? (
									<Link 
										className="edit-button"
										to={`/user/${this.props.id}/edit/`}
									>
										<img
											src={edit}
											alt="edit button"
										/>
										<p> Edit </p>
									</Link>											
								) : (
									<Link 
										className="report-button"
										to={`/user/${this.props.id}/edit/`}
									>
										<img 
											src={report}
											alt="report button"
										/>
										<p> Report </p>
								</Link>
							)}
						</div>
					</div>
					<div className="body-right">
						<div className="userdtail">
							<p className="username"> {this.props.user.nickname}#{this.props.user.id} </p>
							<p className="description"> {this.props.user.introduce} </p>
						</div>				
					</div>
				</div>
				<div className="profile-info">
					<ul className="info-list">
						<li>
							<p>
								<strong> 이름 </strong>
								{this.props.user.name}
							</p>
						</li>
						<li>
							<p>
								<strong> 지역 </strong>
								{this.props.user.region}
							</p>
						</li>
					</ul>
				</div>
			</div>		
		)
	}
}

const mapStateToProps = state => {
	return {
		id: state.user.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
