// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'

export default class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $.ajax("/rooms/" + this.props.roomId + "/comments.json")
      .then((data) => {
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        Room #{this.props.roomId} : {this.props.roomName}
      </div>
    )
  }
};
Room.defaultProps = {}
Room.propTypes = {}
