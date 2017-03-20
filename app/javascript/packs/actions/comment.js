const FETCH_COMMENTS = 'FETCH_COMMENTS';
const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
const CREATE_COMMENT = 'CREATE_COMMENT';


export function fetchComments(comments) {
  return {
    type: FETCH_COMMENTS,
    comments: comments
  };
}

export function receiveComment(comment) {
  return {
    type: RECEIVE_COMMENT,
    comment: comment
  };
}

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment: comment
  };
}
