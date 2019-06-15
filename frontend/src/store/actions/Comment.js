export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST"
export const PUT_COMMENT_REQUEST = "PUT_COMMENT_REQUEST"
export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST"
export const POST_COMMENT = "POST_COMMENT"
export const PUT_COMMENT = "PUT_COMMENT"
export const DELETE_COMMENT= "DELETE_COMMENT"

export const COMMENT_REQUEST_FAILURE= "COMMENT_REQUEST_FAILURE"

export const postCommentRequest = (pid, text) => {
	return {
		type: "POST_COMMENT_REQUEST",
		pid,
		text
	}
}

export const putCommentRequest = (pid, id, text) => {
	return {
		type: "PUT_COMMENT_REQUEST",
		pid,
		id,
		text
  }
}

export const deleteCommentRequest = (pid, id) => {
	return {
		type: "DELETE_COMMENT_REQUEST",
		pid,
		id
	}
}
