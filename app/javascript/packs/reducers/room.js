import { combineReducers } from 'redux'
import comment from './comment'
import participation from './participation'

const initialState = {
  name: ''
}

let room = function reducer(state = initialState, action) {
  switch(action.type) {
    case "FETCHED_ROOM" : {
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
  comment,
  participation
})
