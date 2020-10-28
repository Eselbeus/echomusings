import React from 'react'
import '../App.scss';

class Podcast extends React.Component {
  state: {
    title: '',
    subtitle: ''
  }

  render(){
    return(
      <div>
        <h2>{this.props.podcast.title}</h2>
        <h4>{this.props.podcast.subtitle}</h4>
      </div>
    )
  }
}

export default Podcast;
