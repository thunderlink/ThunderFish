import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from 'store/actions'

import './CommentElement.css'

class CommentElement extends Component {

	state = {
		editTry: false,
		editText: ""
	}	
	
	constructor(props) {
		super(props)
		this.state.editTry = false
		this.state.editText = this.props.commentDetail.comment_text
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.props.putCommentRequest(this.props.meetingId, this.props.commentDetail.id, this.state.editText)
	}

	onEditHandler = (e) => {
		e.preventDefault()
		this.setState((prevState) => {
			return {...prevState, editTry: !prevState.editTry}
		})
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteComment(this.props.meetingId, this.props.commentDetail.id)
	}

	render() {
		return (
			<div className="comment-element">
				{console.log(this.props.commentDetail)}
				<div className="writer">
					<p> {this.props.commentDetail.nickname} </p>
				</div>
				<form onSubmit={this.onSubmitHandler}>
					{
						(this.props.id === this.props.id) ? (
							(this.state.editTry) ? (
								<div className="content">
									<textarea 
										type="text"
										value={this.state.editText}
										onChange={(e)=>this.setState({editText: e.target.value})}
									/>
									<div className="button-set">
										<button type="submit">
											확인
										</button>
										<button onClick={this.onEditHandler}>
												취소
										</button>
									</div>	
								</div>
							) : (							
								<div className="content">
									<div className="text">
										<p> {this.props.commentDetail.comment_text}</p>
									</div>
									<div className="button-set">
										<button onClick={this.onEditHandler}>
											수정
										</button>
										<button onClick={this.onDeleteHandler}>
											삭제
										</button>
									</div>			
								</div>
							)) : (
							<div className="content">
								<div className="text">
									<p> {this.props.commentDetail.comment_text}</p>
								</div>
							</div>
						)
					}
				</form>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		id: state.user.id, 
  }
}

const mapDispatchToProps = dispatch => {
	return {
		deleteComment: (pid, id) => {
			dispatch(actions.comment.deleteCommentRequest(pid, id))
		},
		putCommentRequest: (pid, id, text) => {
			dispatch(actions.comment.putCommentRequest(pid, id, text))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentElement);

