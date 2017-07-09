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

  onReachScrollToTop() {
    this.props.fetchRoomCommentRequest(this.props.roomId, this.props.comment.page + 1, this.scrollTopTo.bind(this))
  }

  scrollTopTo(comments) {
    this.refs.comments.scrollTopTo(comments[0].id)
  }

  render() {
    return (
      <div>
        <ChannelSubscriber roomId={this.props.roomId} onConnected={this.onConnected.bind(this)} onCommentLoaded={this.onCommentLoaded.bind(this)}/>

        Room #{this.props.roomId} : {this.props.room.name}
        <Participations currentUserId={this.props.currentUserId} participations={this.props.participations}/>
        <Comments ref='comments' currentUserId={this.props.currentUserId} comments={this.props.comment.comments} onReachScrollToTop={this.onReachScrollToTop.bind(this)}/>
        <CommentForm roomId={this.props.roomId} onCommentFinish={this.onCommentLoaded.bind(this)}/>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    room: state.room,
    comment: state.comment,
    participations: state.participation.participations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeDispatch: (data) => { dispatch(data) },

    fetchRoomRequest: (roomId, callback) => {
      dispatch(RoomActions.fetchRoom(roomId, callback))
    },

    fetchRoomCommentRequest: (roomId, page, callback) => {
      let query = `
        query($id: ID!, $page: String!) {
          room(id: $id) {
            id
            name
            comments(page: $page) {
              id
              body
              created_at
              user { id email }
            }
          }
        }
      `
      let variables = { id: roomId, page: page }
      $.ajax({
        url: '/graphql', type: 'POST', data: { query: query, variables: variables }
      }).then((response) => {
        let comments = response.data.room.comments
        if (comments.length > 0) {
          dispatch(CommentActions.fetchComments(comments, page))
          callback(comments)
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
