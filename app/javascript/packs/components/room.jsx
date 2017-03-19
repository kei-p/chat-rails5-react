// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import * as Actions from '../actions/comment'
import { connect } from 'react-redux'

import Comment from './comment.jsx'

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCommentRequest(this.props.roomId)
  }

  renderComments() {
    return this.props.comments.map((comment) => {
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
