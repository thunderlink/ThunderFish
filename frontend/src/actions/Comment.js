export const GET_COMMENT_REQUEST = "GET_COMMENT_REQUEST"
export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST"
export const PUT_COMMENT_REQUEST = "PUT_COMMENT_REQUEST"
export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST"
export const GET_COMMENT = "GET_COMMENT"
export const POST_COMMENT = "POST_COMMENT"
export const PUT_COMMENT = "PUT_COMMENT"
export const DELETE_COMMENT= "DELETE_COMMENT"
export const FAILURE= "FAILURE"

export const getCommentRequest = (index/*which meeting?*/, user/*or token? for authentication */) => {
    return {
        type: "GET_COMMENT_REQUEST",
        index,
        user
    }
}

export const postCommentRequest = (comment, user) => {
    return {
        type: "POST_COMMENT_REQUEST",
        comment,
        user
    }
}

export const putCommentRequest = (index, comment, user) => {
    return {
        type: "PUT_COMMENT_REQUEST",
        index,
        comment,
        user
    }
}

export const deleteCommentRequest = (index, user) => {
    return {
        type: "DELETE_COMMENT_REQUEST",
        index,
        user
    }
}

export const getComment = (comments) => {
    return {
        type: "GET_COMMENT",
        comments
    }
}

export const postComment = (comment) => {
    return {
        type: "POST_COMMENT",
        comment
    }
}

export const putComment = (index, comment) => {
    return {
        type: "PUT_COMMENT",
        index,
        comment
    }
}

export const deleteComment = (index) => {
    return {
        type: "PUT_COMMENT",
        index
    }
}

export const failure = () => {
    return {
        type: "FAILURE"
    }
}