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

import Room from './components/room.jsx'
import reducer from './reducers/room'

const store = createStore(reducer)

$(document).on('ready', () => {
  let $room = $('#room')
  let roomId = $room.data('room-id')
  let currentUserId = $room.data('current-user-id')

  if($room.length > 0 ){
    ReactDOM.render(
      <Provider store={store}>
        <Room roomId={roomId} currentUserId={currentUserId}/>
      </Provider>,
      $room[0]
    );
  }
});
