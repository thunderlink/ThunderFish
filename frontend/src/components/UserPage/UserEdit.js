import React, { Component } from 'react'
import { connect } from 'react-redux'

import ImageBox from 'components/molecules/ImageBox'

import * as actions from 'store/actions'

import './UserEdit.css'

class UserEdit extends Component {
	state = {
		file: null,
		preview: '',
		nickname: '',
		introduce: '',
	}

	constructor(props) {
		super(props)
		this.state = {
			file: null,
			preview: props.pic_url,
			introduce: props.introduce,
			nickname: props.nickname
		}
	}

	handleImageChange = (e) => {
		e.preventDefault();

		let reader = new FileReader()
		let file = e.target.files[0]
		reader.onloadend = () => {
			this.setState({
				file: file,
				preview: reader.result
			})
		}
		reader.readAsDataURL(file)
	}

	onSubmitHandler = (e) => {
		e.preventDefault();
		if(this.checkSubmit()) {
			this.props.userPut(this.props.id, {
				photo: this.state.file,
				originalPhoto: this.props.originalPhoto,
				nickname: this.state.nickname,
				introduce: this.state.introduce
			})
		}
	}

	checkSubmit = () => {
		if(this.state.nickname.length === 0) {
			this.setState({nameError: true});
			return false;
		}
		else return true;
	}

	render() {
		return (
			<div className="user-edit">
				<form className="user-edit__form" onSubmit={this.onSubmitHandler}>
					<div className="input-title">
						<h2> 프로필 수정 </h2>
						{
							(this.props.postDone) 
								?	((this.props.postFailed) 
									? (<p style={{color: '#ff0000'}}> 변경사항이 반영되지 않았습니다. </p>)
									: (<p style={{color: '#000000'}}> 변경사항이 반영되었습니다. </p>)) 
								: (null)
						}
					</div>
					<div className="input-item">
						<p className="input-item__title"> 사진 </p>
						<input
							className="input-item__input"
							type="file" id="user-profile"
							onChange={this.handleImageChange}
						/>
					</div>
					<div className="input-item">
						<p className="input-item__title"> 미리보기 </p>
						<div className="input-item__image">
							<div className="image-wrapper">
								<ImageBox
									alt="profile-preview"
									src={this.state.preview}
								/>
							</div>
						</div>
					</div>
					<div className="input-item">
						<p className="input-item__title"> 닉네임 </p>
						<input
							className="input-item__input"
							type="text" id="user-nickname"
							value={this.state.nickname}
							onChange={(e)=>this.setState({nickname: e.target.value})}
						/>
					</div>
					{(this.state.nameError) ? (
						<p className='user-warning-message'>
							새 닉네임을 입력해주세요.
						</p>
					) : (
						null
					)}
					<div className="input-item">
						<p className="input-item__title"> 자기소개 </p>
						<textarea 
							className="input-item__textarea"
							id="user-introduce"
							value={this.state.introduce}
							onChange={(e)=>this.setState({introduce: e.target.value})}
						/>
					</div>
					<button type="submit" className="submit-button"> 수정하기 </button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		postDone: state.user.postDone,
		postFailed: state.user.postFailed,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		userPut: (index, profile) => {
			dispatch(actions.user.putUserRequest(index, profile))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
