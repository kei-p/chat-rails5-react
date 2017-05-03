const initialState = []

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ROOM' : {
      return action.room.comments
    }
    case 'FETCH_COMMENTS' : {
      return action.comments
    }
    case 'RECEIVE_COMMENT' : {
      var comments = state.filter( (x, i, self) => {
        return x.id != action.comment.id;
      });
      return comments.concat(action.comment)
    }
    case 'CREATE_COMMENT': {
      var comments = state.filter( (x, i, self) => {
        return x.id != action.comment.id;
      });
      return comments.concat(action.comment)
    }
    default:
      return state
  }
}
