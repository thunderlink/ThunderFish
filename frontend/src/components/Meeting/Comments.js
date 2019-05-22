import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Comments extends Component {

    onPutHandler = (e) => {
        e.preventDefault()
        this.props.putComment(this.props.commentDetail.id /* TODO :: comment*/)
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
                        <div className="text">
                            <h2> {this.props.commentDetail.comment_text}</h2>
                        </div>
                    </div>
                    <div className="content">
                    </div>
                </div>
                <button onClick={this.onPutHandler}>
                    수정
                </button>
                <button onClick={this.onDeleteHandler}>
                    삭제
                </button>
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
        deleteComment: (id, token) => {
            dispatch(actions.comment.deleteCommentRequest(id, token))
        },
        putComment: (id, comment, token) => {
            dispatch(actions.comment.putCommentRequest(id, comment, token))
        }
        ,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

