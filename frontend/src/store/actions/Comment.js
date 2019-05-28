export const GET_COMMENT_REQUEST = "GET_COMMENT_REQUEST"
export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST"
export const PUT_COMMENT_REQUEST = "PUT_COMMENT_REQUEST"
export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST"
export const GET_COMMENT = "GET_COMMENT"
export const POST_COMMENT = "POST_COMMENT"
export const PUT_COMMENT = "PUT_COMMENT"
export const DELETE_COMMENT= "DELETE_COMMENT"

//case of key-duplicate. should be renamed.
export const FAILURE= "FAILURE"

export const getCommentRequest = (index/*which meeting?*/, user/*or token? for authentication */) => {
    return {
        type: "GET_COMMENT_REQUEST",
        index,
        user
    }
}

export const postCommentRequest = (id, text) => {
	return {
		type: "POST_COMMENT_REQUEST",
		id,
		text
	}
}

export const putCommentRequest = (id, text) => {
	return {
    type: "PUT_COMMENT_REQUEST",
		id,
		text
  }
}

export const deleteCommentRequest = (id) => {
  return {
		type: "DELETE_COMMENT_REQUEST",
		id
	}
}
