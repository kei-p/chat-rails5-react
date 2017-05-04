import React from 'react'

export class Participation extends React.Component {
  render() {
    return (
      <span className={'participation ' + (this.props.participation.online ? 'is-online' : 'is-offline')}>
        {this.props.participation.user.email}
      </span>
    )
  }
}

export default class Participations extends React.Component {
  renderParticipations() {
    return this.props.participations
      .filter((a) => { return a.user.id != this.props.currentUserId })
      .sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1
      }).map((participation) => {
      return <Participation key={participation.id} participation={participation} />
    });
  }

  renderMe() {
    let me = this.props.participations
      .find((a) => { return a.user.id == this.props.currentUserId })
    if(me != null) {
      return <Participation key={me.id} participation={me} />
    } else {
      return <div/>
    }
  }

  render() {
    return (
      <div className='participations'>
        <div className='participations__members'>
          {this.renderMe()}
          {this.renderParticipations()}
        </div>
      </div>
    )
  }
}
