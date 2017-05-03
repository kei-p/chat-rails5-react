import { combineReducers } from 'redux'
import comment from './comment'
import participation from './participation'

export default combineReducers({
  comment,
  participation
})
