import React from 'react'

export default class Comment extends React.Component {
  render() {
    return (
      <div>
        {this.props.comment.user.email}
         >>
        {this.props.comment.body}
      </div>
    )
  }
}
