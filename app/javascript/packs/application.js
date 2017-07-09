import WebpackerReact from 'webpacker-react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";
import { Provider, connect } from 'react-redux'

import Room from './components/room.jsx'
import reducer from './reducers/room'
import saga from './sagas/room'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Room roomId={this.props.room_id} currentUserId={this.props.current_user_id}/>
      </Provider>
    )
  }
}

sagaMiddleware.run(saga)
WebpackerReact.setup({Root})
