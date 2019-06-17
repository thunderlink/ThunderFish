import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageBox from 'components/molecules/ImageBox'

import edit from 'icons/edit-button.png'
import default_profile from 'icons/default-profile.png'

import UserEdit from './UserEdit'

import * as actions from 'store/actions'
import './UserDetail.css'

class UserDetail extends Component {
	state = {
		editTry: false
	}

	onClickEdit = (e) => {
		e.preventDefault();
		this.setState(prevState => {
			return({...prevState, editTry: !prevState.editTry})
		})
	}

	render() {
		return(
			<div className="user-detail">
				<div className="profile-body">
					<div className="body-left">
						<div className="image-wrapper">
							<ImageBox
								default={default_profile}
								src={this.props.user.pic_url}
								alt="profile image" 
							/>	
						</div>
						<div className="button-set">
							{
								(this.props.id === this.props.user.id) ? (
									<button
										className="edit-button"
										onClick={this.onClickEdit}
										style={(this.state.editTry) ? {background: '#ff0000'} : {background: '#fed008'}} 
									>
										<img
											src={edit}
											alt="edit button"
										/>
										<p> {(this.state.editTry) ? '취소' : '수정'} </p>
									</button>											
								) : (
									null
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
				{
					(this.state.editTry) ? (
						<UserEdit
							pic_url={this.props.user.pic_url}
							originalPhoto={this.props.user.photo}
							introduce={this.props.user.introduce}
							nickname={this.props.user.nickname}
							id={this.props.user.id}
						/>
					) : (null)
				}
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
		putUser: (index, profile) => {
			dispatch(actions.user.putUserRequest(index, profile));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
