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
      .sort((a, b) => {
        return a.created_at > b.created_at ? 1 : -1
      }).map((participation) => {
      return <Participation key={participation.id} participation={participation} />
    });
  }

  render() {
    return (
      <div className='participations'>
        {this.renderParticipations()}
      </div>
    )
  }
}
