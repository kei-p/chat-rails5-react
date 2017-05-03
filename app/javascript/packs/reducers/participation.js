const initialState = {
  participations: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_PARTICIPATIONS' : {
      return Object.assign({}, state,{
        participations: action.participations
      })
    }
    default:
      return state
  }
}
