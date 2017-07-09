const initialState = {
  page: 1,
  comments: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCHED_ROOM' : {
      return Object.assign({}, state,{
        comments: action.room.comments
      })
    }
    case 'FETCH_COMMENTS' : {
      return Object.assign({}, state,{
        comments: state.comments.concat(action.comments),
        page: action.page
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
