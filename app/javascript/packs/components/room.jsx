// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import * as RoomActions from '../actions/room'
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
    this.props.fetchRoomRequest(this.props.roomId, this.autoScroll.bind(this))
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
        Room #{this.props.roomId} : {this.props.room.name}
        <Participations participations={this.props.participations}/>
        <Comments ref='comments' comments={this.props.comments}/>
        <CommentForm roomId={this.props.roomId} onCommentFinish={this.autoScroll.bind(this)}/>
      </div>
    )
  }
};
Room.defaultProps = {}
Room.propTypes = {}

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
      $.ajax("/rooms/" + roomId + ".json")
        .then((data) => {
          dispatch(RoomActions.fetchRoom(data))
        })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
