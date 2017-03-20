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
    case 'CREATE_COMMENT': {
      return Object.assign({}, state,{
        comments: state.comments.concat(action.comment)
      })
    }
    default:
      return state
  }
}
