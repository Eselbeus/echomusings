import React from 'react'
import { connect } from 'react-redux'
import Podcast from './Podcast'
import { getPodcasts } from '../actions/podcastActions'
import { postPodcast } from '../actions/podcastActions'
import { deletePodcast } from '../actions/podcastActions'
import { removePodcast } from '../actions/podcastActions'
import '../App.scss';

class Podcasts extends React.Component {
  state = {
    title: '',
    subtitle: '',
    url: '',
    description: ''
  }

  componentDidMount() {
    this.props.getPodcasts()
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandlerPodcast = (e) => {
    e.preventDefault()
    let title = e.target.title.value
    let subtitle = e.target.subtitle.value
    let description = e.target.description.value
    let url = e.target.url.value
    let embedType;
    if (url.includes("tracks") || url.includes("playlists")){
      let urlArr;
      if (url.includes("tracks")){
        urlArr = url.split("tracks/")
        embedType = "tracks"
      }
      else if (url.includes("playlists")){
        urlArr = url.split("playlists/")
        embedType = "playlists"
      }
      let nextPart = urlArr[1].split("&color")
      url = nextPart[0]
      let user_id = this.props.currentUser.user.id

      let config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          title: title,
          subtitle: subtitle,
          url: url,
          description: description,
          embed_type: embedType,
          user_id: user_id
        })
      }

      if (title.length < 1){
        alert("Title cannot be blank")
      }
      else {
        this.props.postPodcast(user_id, config)
      }
    }
    else {
      alert("Embed code not valid. Please try again.")
    }

  }

  deleteHandler = (id, e) => {
    e.preventDefault()
    this.props.removePodcast(id)
    let config = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    }
    this.props.deletePodcast(id, config)
  }

  render(){
    let token = localStorage.getItem('token')
    let podcasts = this.props.podcasts.podcasts;
    let podcastComponents;
    try {
      if (podcasts !== undefined){
        podcastComponents = podcasts.sort((a,b) => {return b.id - a.id}).map(podcast => {
          return <Podcast podcast={podcast} key={podcast.id} deleteHandler={this.deleteHandler}/>
        })
      }
    }
    catch {
      podcastComponents = 'Podcasts loading. Try refreshing if not loading. If not loading then come back later'
    }
    return (
      <div className="podcasts">
        {!!token ?
        <div>
          <h1>Podcast</h1>
          <form onSubmit={this.submitHandlerPodcast}>
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

const mapStateToProps = state => ({ podcasts: state.podcasts })

const mapDispatchToProps = { getPodcasts, postPodcast, deletePodcast, removePodcast }

export default connect(mapStateToProps, mapDispatchToProps)(Podcasts);
