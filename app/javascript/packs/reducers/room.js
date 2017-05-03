import { combineReducers } from 'redux'
import comments from './comment'
import participations from './participation'

const initialState = {
  name: ''
}

let room = function reducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ROOM' : {
      return Object.assign({}, state,{
        name: action.room.name
      })
    }
    default:
      return state
  }
}


export default combineReducers({
  room,
  comments,
  participations
})
