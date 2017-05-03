import React from 'react'
import { connect } from 'react-redux'

export class ChannelSubscriber extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: null
    }
  }

  subceribeChannel() {
    return App.cable.subscriptions.create({ channel: "RoomChannel", room: this.props.roomId },{
      connected() {
        console.log('connected')
        this.onConnected()
      },

      received(data) {
        console.log('received')
        this.subscribeDispatch(data)

        switch (data.type) {
          case 'FETCH_ROOM' : {
            this.onCommentLoaded()
          }
          case 'CREATE_COMMENT' : {
            this.onCommentLoaded()
          }
          case 'RECEIVE_COMMENT' : {
            this.onCommentLoaded()
          }
        }
      },

      leave(roomId) {
        this.perform('leave', { room: roomId })
        this.perform('unsubscribed')
      },

      onCommentLoaded: this.props.onCommentLoaded,
      onConnected: this.props.onConnected,
      subscribeDispatch: this.props.subscribeDispatch.bind(this)
    })
  }

  setupSubscriber() {
    this.setState({channel: this.subceribeChannel()})
  }

  componentDidMount() {
    this.setupSubscriber()
    $(window).on('beforeunload', this.onUnload.bind(this))
  }

  componentWillUnmount() {
    $(window).off('beforeunload', this.onUnload)
  }

  onUnload() {
    this.state.channel.leave(this.props.roomId)
  }

  render() {
    return (
      <div/>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeDispatch: (data) => { dispatch(data) }
  }
}

export default connect(null, mapDispatchToProps)(ChannelSubscriber)
