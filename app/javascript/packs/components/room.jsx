// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import * as CommentActions from '../actions/comment'
import * as ParticipationActions from '../actions/participation'
import { connect } from 'react-redux'

import Comments from './comments.jsx'
import Participations from './participations.jsx'
import CommentForm from './comment_form.jsx'

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCommentRequest(this.props.roomId, this.autoScroll.bind(this))
    this.props.fetchParticipationRequest(this.props.roomId)
    this.subceribeChannel()
    $(window).on('beforeunload', this.onUnload.bind(this))
  }

  subceribeChannel() {
    this.channel = App.cable.subscriptions.create({ channel: "RoomChannel", room: this.props.roomId },{
      connected() {
        console.log('connected')
      },

      received(data) {
        console.log('received')
        this.subscribeDispatch(data)
        this.autoScroll()
      },

      leave(roomId) {
        this.perform('leave', { room: roomId })
        this.perform('unsubscribed')
      },

      subscribeDispatch: this.props.subscribeDispatch.bind(this),
      autoScroll: this.autoScroll.bind(this)
    })
  }

  onUnload() {
    this.channel.leave(this.props.roomId)
  }

  componentWillUnmount() {
    $(window).off('beforeunload', this.onUnload)
  }

  autoScroll() {
    this.refs.comments.autoScroll()
  }

  render() {
    return (
      <div>
        Room #{this.props.roomId} : {this.props.roomName}
        <Participations participations={this.props.participations}/>
        <Comments ref='comments' comments={this.props.comments}/>
        <CommentForm roomId={this.props.roomId}/>
      </div>
    )
  }
};
Room.defaultProps = {}
Room.propTypes = {}

function mapStateToProps(state) {
  return {
    comments: state.comment.comments,
    participations: state.participation.participations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeDispatch: (data) => { dispatch(data) },

    fetchCommentRequest: (roomId, callback) => {
      $.ajax("/rooms/" + roomId + "/comments.json")
        .then((data) => {
          dispatch(CommentActions.fetchComments(data))
          callback()
        })
    },

    fetchParticipationRequest: (roomId) => {
      $.ajax("/rooms/" + roomId + "/participations.json")
        .then((data) => {
          dispatch(ParticipationActions.fetchParticipations(data))
        })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
