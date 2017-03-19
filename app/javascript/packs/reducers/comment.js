const initialState = {
  comments: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS': {
      return { comments: action.comments }
    }
    default:
      return state
  }
}
