import React, { Component } from 'react'
import { connect } from 'react-redux'

import Comments from './Comments'

import * as actions from '../../actions'

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
						Object.keys(this.props.comments).map(key => (
							<Comments
								key={`comment_${key}`}
								commentDetail={this.props.comments[key]}
							/>
						))
					}
				</div>
				<div className="add-comment">
					<form onSubmit={this.onSubmitCommentHandler}>
						<input
							type="text"
							onChange={e => this.setState({newComment: e.target.value})}
							id="new_comment"
						/>
						<button type="submit"> 작성 </button>
					</form>
				</div>
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
		postCommentRequest: (id, text) => {
			dispatch(actions.comment.postCommentRequest(id, text))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
