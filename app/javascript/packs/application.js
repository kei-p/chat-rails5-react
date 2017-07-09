/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';
import WebpackerReact from 'webpacker-react'

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
