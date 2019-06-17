import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CommentElement from './CommentElement'

import * as actions from 'store/actions'

import './CommentList.css'

class CommentList extends Component {

	state = {
		newComment: ""
	}

	onSubmitCommentHandler = (e) => {
		e.preventDefault()
		this.props.postCommentRequest(this.props.meetingId, this.state.newComment);
	}

	render() {
		return(
			<div className="comment-list">
				<div className="current-comments">
					{
						(this.props.comments !== undefined && this.props.comments !== null) ?
							Object.keys(this.props.comments).map(key => (
								<CommentElement
									key={`comment_${key}`}
									meetingId={this.props.meetingId}
									commentDetail={this.props.comments[key]}
								/>
							))
							: (<div/>)
					}
				</div>
				<div className="add-comment">
					<div className="new-comment-title">
						<p> 새 댓글 작성 </p>
					</div>
					{
						(this.props.isAuthenticated) ? (
							<form 
								className="new-comment-text"
								onSubmit={this.onSubmitCommentHandler}
							>
								<textarea
									type="text"
									onChange={e => this.setState({newComment: e.target.value})}
									id="new_comment"
								/>
								<div className="button-set">
									<button type="submit"> 작성 </button>
								</div>
							</form>
						) : (
							<div className="new-comment-text">
								<p>
									댓글을 작성하려면 먼저 <Link to="/signin/">로그인</Link> 해주세요.
								</p>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		id: state.user.id,
		isAuthenticated: state.user.isAuthenticated,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		postCommentRequest: (pid, text) => {
			dispatch(actions.comment.postCommentRequest(pid, text))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
