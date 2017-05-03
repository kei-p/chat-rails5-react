// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import * as Actions from '../actions/comment'
import { connect } from 'react-redux'

import Comment from './comment.jsx'
import CommentForm from './comment_form.jsx'

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCommentRequest(this.props.roomId, this.autoScroll.bind(this))
    this.subceribeChannel()
  }

  subceribeChannel() {
    App.cable.subscriptions.create({ channel: "RoomChannel", room: this.props.roomId },{
      connected() {
        console.log('connected')
      },
      received(data) {
        console.log('received')
        this.subscribeDispatch(data)
        this.autoScroll()
      },
      subscribeDispatch: this.props.subscribeDispatch.bind(this),
      autoScroll: this.autoScroll.bind(this)
    })
  }

  autoScroll() {
    let $target = $('.comments')
    let height = $target.prop('scrollHeight')
    $target.animate({scrollTop: height}, 300)
  }

  renderComments() {
    return this.props.comments
      .sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1
      }).map((comment) => {
      return <Comment key={comment.id} comment={comment} />
    });
  }

  render() {
    return (
      <div>
        Room #{this.props.roomId} : {this.props.roomName}
        <div className='comments'>
          {this.renderComments()}
        </div>
        <CommentForm roomId={this.props.roomId}/>
      </div>
    )
  }
};
Room.defaultProps = {}
Room.propTypes = {}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    subscribeDispatch: (data) => { dispatch(data) },

    fetchCommentRequest: (roomId, callback) => {
      $.ajax("/rooms/" + roomId + "/comments.json")
        .then((data) => {
          dispatch(Actions.fetchComments(data))
          callback()
        })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
