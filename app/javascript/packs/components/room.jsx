// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import * as RoomActions from '../actions/room'
import * as CommentActions from '../actions/comment'
import * as ParticipationActions from '../actions/participation'
import { connect } from 'react-redux'

import ChannelSubscriber from './channel_subscriber.jsx'
import Comments from './comments.jsx'
import Participations from './participations.jsx'
import CommentForm from './comment_form.jsx'

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  onCommentLoaded() {
    this.refs.comments.autoScroll()
  }

  onConnected() {
    this.props.fetchRoomRequest(this.props.roomId, this.onCommentLoaded.bind(this))
  }

  render() {
    return (
      <div>
        <ChannelSubscriber roomId={this.props.roomId} onConnected={this.onConnected.bind(this)} onCommentLoaded={this.onCommentLoaded.bind(this)}/>

        Room #{this.props.roomId} : {this.props.room.name}
        <Participations participations={this.props.participations}/>
        <Comments ref='comments' comments={this.props.comments}/>
        <CommentForm roomId={this.props.roomId} onCommentFinish={this.onCommentLoaded.bind(this)}/>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    room: state.room,
    comments: state.comments,
    participations: state.participations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeDispatch: (data) => { dispatch(data) },

    fetchRoomRequest: (roomId, callback) => {
      let query = `
        query($id: ID!) {
          room(id: $id) {
            id
            name
            participations {
              id
              online
              user { id email }
            }
            comments {
              id
              body
              created_at
              user { id email }
            }
          }
        }
      `
      let variables = { id: roomId }
      $.ajax({
        url: '/graphql', type: 'POST', data: { query: query, variables: variables }
      }).then((response) => {
        let room = response.data.room
        dispatch(RoomActions.fetchRoom(room))
        callback()
      })
      // API
      // $.ajax(
      //   "/rooms/" + roomId + ".json"
      // ).then((data) => {
      //   dispatch(RoomActions.fetchRoom(data))
      //   callback()
      // })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
