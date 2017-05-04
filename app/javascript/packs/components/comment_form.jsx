import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions/comment'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: ""
    };
  }

  onChangeTextValue(e) {
    this.setState({textValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.submitCommentRequest({ roomId: this.props.roomId, body: this.state.textValue })
    this.setState({textValue: ''})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" name="comment[body]" value={this.state.textValue} onChange={this.onChangeTextValue.bind(this)}/>
        <button type="submit">submit</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitCommentRequest: (params) => {
      let query = "mutation{ addComment(input: {"
        + `roomId: ${params.roomId}`
        + `body: "${params.body}"`
        + "}){id body created_at user{id email}}}"
      $.ajax({
        url: '/graphql', type: 'POST', data: { query: query }
      }).then((response) => {
        let comment = response.data.addComment
        dispatch(Actions.createComment(comment))
      })
      // API
      // $.ajax({
      //   type: 'POST',
      //   dataType: 'json',
      //   url: "/rooms/" + params.roomId + "/comments.json",
      //   data: {
      //     comment: {
      //       body: params.body
      //     }
      //   }
      // }).then((data) => {
      //   dispatch(Actions.createComment(data))
      // })
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentForm)
