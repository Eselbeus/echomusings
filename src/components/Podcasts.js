import React from 'react'
import Podcast from './Podcast'
import '../App.scss';

class Podcasts extends React.Component {
  state = {
    title: '',
    subtitle: '',
    url: '',
    description: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    let token = localStorage.getItem('token')
    let podcasts = this.props.podcasts;
    let podcastComponents;
    if (podcasts !== undefined){
      podcastComponents = podcasts.sort((a,b) => {return b.id - a.id}).map(podcast => {
        return <Podcast podcast={podcast} key={podcast.id}/>
      })
    }
    return (
      <div className="podcasts">
        {!!token ?
        <div>
          <h1>Podcast</h1>
          <form onSubmit={this.props.submitHandler}>
            <input className="article-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
            <input className="article-form-item" placeholder="Subtitle" name="subtitle" type="text" value={this.state.subtitle} onChange={this.changeHandler}/><br/><br/>
            <input className="article-form-item" placeholder="Soundcloud EmbedCode" name="url" type="text" value={this.state.url} onChange={this.changeHandler}/><br/><br/>
            <input className="article-form-item" placeholder="Description" name="description" type="text" value={this.state.description} onChange={this.changeHandler}/><br/><br/>
            <input className="submit" type="submit" value="Create New Podcast"/>
          </form>
        </div> : ''}
        <div className="podcast-container">{podcastComponents}</div>
      </div>
    )
  }
}

export default Podcasts;
