import React from 'react'

export class Comment extends React.Component {
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

export default class Comments extends React.Component {
  autoScroll() {
    let $target = $(this.refs.comments)
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
      <div ref='comments' className='comments'>
        {this.renderComments()}
      </div>
    )
  }
}
