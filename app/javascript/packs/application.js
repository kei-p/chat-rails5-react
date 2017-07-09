import WebpackerReact from 'webpacker-react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import Room from './components/room.jsx'
import reducer from './reducers/room'

const store = createStore(reducer)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Room roomId={this.props.room_id} currentUserId={this.props.current_user_id}/>
      </Provider>
    )
  }
}

WebpackerReact.setup({Root})
