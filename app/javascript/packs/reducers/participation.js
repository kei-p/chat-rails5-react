const initialState = []

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ROOM' : {
      return action.room.participations
    }
    case 'FETCH_PARTICIPATIONS' : {
      return action.participations
    }
    case 'UPDATE_PARTICIPATIONS' : {
      return action.participations
    }
    default:
      return state
  }
}
