const initialState = {
  comments: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS' : {
      return Object.assign({}, state,{
        comments: action.comments
      })
    }
    case 'RECEIVE_COMMENT' : {
      var comments = state.comments.filter( (x, i, self) => {
        return x.id != action.comment.id;
      });
      return Object.assign({}, state,{
        comments: comments.concat(action.comment)
      })
    }
    case 'CREATE_COMMENT': {
      var comments = state.comments.filter( (x, i, self) => {
        return x.id != action.comment.id;
      });
      return Object.assign({}, state,{
        comments: comments.concat(action.comment)
      })
    }
    default:
      return state
  }
}
