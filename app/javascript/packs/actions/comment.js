const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function fetchComments(comments) {
  return {
    type: FETCH_COMMENTS,
    comments: comments
  };
}
