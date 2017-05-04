import React from 'react'

export class Comment extends React.Component {
  render() {
    let comment = this.props.comment
    let user = comment.user
    return (
      <div id={`comment_${comment.id}`} className={'comment ' + (this.props.currentUserId == user.id ? 'is-me' : '' )  }>
        <div className='cf'>
          <div className='comment__body'>
            {comment.body}
          </div>
        </div>
        <div className='cf'>
          <span className='comment__user'>
            {user.email}
          </span>
        </div>
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

  componentDidMount() {
    let $target = $(this.refs.comments)
    $target.on('scroll', this.onScroll.bind(this))
  }

  renderComments() {
    return this.props.comments
      .sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1
      }).map((comment) => {
      return <Comment key={comment.id} comment={comment} currentUserId={this.props.currentUserId}/>
    });
  }

  scrollTopTo(commentId) {
    let $target = $(this.refs.comments)
    let $targetComment = $(`#comment_${commentId}`)
    let base = $target.prop('scrollTop')
    let top = $targetComment.offset().top - $targetComment.outerHeight()
    $target.scrollTop(top - base)
  }

  onScroll() {
    if (this.refs.comments.scrollTop <= 0) {
      this.props.onReachScrollToTop()
    }
  }

  render() {
    return (
      <div ref='comments' className='comments'>
        {this.renderComments()}
      </div>
    )
  }
}
