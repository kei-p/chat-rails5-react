const FETCH_COMMENTS = 'FETCH_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';


export function fetchComments(comments) {
  return {
    type: FETCH_COMMENTS,
    comments: comments
  };
}

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment: comment
  };
}
