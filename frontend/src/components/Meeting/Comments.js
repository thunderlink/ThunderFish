import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Comments extends Component {

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
		this.props.putCommentRequest(this.props.commentDetail.id, this.state.editText)
	}

	onEditHandler = (e) => {
		e.preventDefault()
		this.setState((prevState) => {
			return {...prevState, editTry: !prevState.editTry}
		})
	}

	onDeleteHandler = (e) => {
		e.preventDefault()
		this.props.deleteComment(this.props.commentDetail.id)
	}

	render() {
		return (
			<div className="comment">
				<div className="header">
					<div className="header_left">
						<div className="username">
							<h2> {this.props.commentDetail.nickname} </h2>
						</div>
						<form onSubmit={this.onSubmitHandler}>
							{(this.state.editTry) ? (
								<div className="content">
									<input 
										type="text"
										value={this.state.editText}
										onChange={(e)=>this.setState({editText: e.target.value})}
									/>
									<div>
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
										<h2> {this.props.commentDetail.comment_text}</h2>
									</div>
									<div>
										<button onClick={this.onEditHandler}>
											수정
										</button>
										<button onClick={this.onDeleteHandler}>
											삭제
										</button>
									</div>			
								</div>
							)}
						</form>	
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (id) => {
            dispatch(actions.comment.deleteCommentRequest(id))
        },
        putCommentRequest: (id, text) => {
            dispatch(actions.comment.putCommentRequest(id, text))
        }
        ,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

