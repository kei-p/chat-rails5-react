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
    this.props.fetchCommentRequest(this.props.roomId)
    this.subceribeChannel()
  }

  subceribeChannel() {
    App.cable.subscriptions.create({ channel: "RoomChannel", room: this.props.roomId },{
      connected() {
        console.log('connected')
      },
      received(data) {
        console.log('received')
        this.receiveComment(data)
      },
      receiveComment: this.props.receiveComment.bind(this)
    })
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
        <div>
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
    fetchCommentRequest: (roomId) => {
      $.ajax("/rooms/" + roomId + "/comments.json")
        .then((data) => {
          dispatch(Actions.fetchComments(data))
        })
    },
    receiveComment: (comment) => {
      dispatch(Actions.receiveComment(comment))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
