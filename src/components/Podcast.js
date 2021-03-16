import React from 'react'
import { Link } from 'react-router-dom'
import '../App.scss';

class Podcast extends React.Component {
  state = {
    title: '',
    subtitle: '',
    url: '',
    description: '',
    embedType: '',
    editButton: true,
    delete: false,
    edit: false
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // deleteHandler = (e) => {
  //   // e.preventDefault()
  //   fetch(`http://localhost:3000/api/v1/podcasts/${this.props.podcast.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accepts': 'application/json',
  //     }
  //   })
  // }

  submitHandlerPatch = (e) => {
    // e.preventDefault()
    let title = e.target.title.value || this.props.podcast.title
    let subtitle = e.target.subtitle.value || this.props.podcast.subtitle
    let url = e.target.url.value || this.props.podcast.url
    let description = e.target.description.value || this.props.podcast.description
    let embedType = e.target.embedType.value || this.props.podcast.embedType
    let id = this.props.podcast.id

    let config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        subtitle: subtitle,
        url: url,
        description: description,
        embed_type: embedType
      })
    }

    fetch(`http://localhost:3000/api/v1/podcasts/${id}`, config)
      .then(res => res.json())
      .then(res => {this.setState({podcast: res, title: '',
        subtitle: '', description: ''
      }, console.log(res))
      console.log(this.props)
      })
  }

  deleteConfirm = (e) => {
    e.preventDefault()
    this.setState({delete: true})
  }

  editForm = (e) => {
    e.preventDefault()
    this.setState({edit: true})
  }

  render(){
    let token = localStorage.getItem('token')
    let soundcloudUrlId = this.props.podcast.url
    let soundcloudSource;
    if (this.props.podcast.embed_type === "tracks"){
      soundcloudSource = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudUrlId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
    }
    else if (this.props.podcast.embed_type === "playlists"){
      soundcloudSource = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${soundcloudUrlId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
    }
    return(
      <div>
        <h2>{this.props.podcast.title}</h2>
        <h4>{this.props.podcast.subtitle}</h4>
        <section className="podcast-layout">
          <div className="podcast-enclosure podcast-layout-child">
            <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={soundcloudSource}></iframe><div className="iframePlayer"></div>
          </div>
          <div className="podcast-description podcast-layout-child">
            <p>{this.props.podcast.description}</p>
          </div>
        </section>
        {!!token ?
        <div>
          <div className="edit" onClick={this.editForm}>
            <Link to={`/podcasts`}><button>Edit</button></Link>
          </div>
          <div className="edit">
            {!!token ?
            <form onSubmit={this.submitHandlerPatch}>
              <input className="podcast-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
              <input className="podcast-form-item" placeholder="Subtitle" name="subtitle" type="text" value={this.state.subtitle} onChange={this.changeHandler}/><br/><br/>
              <input className="podcast-form-item" placeholder="Soundcloud Url" name="url" type="text" value={this.state.url} onChange={this.changeHandler}/><br/><br/>
              <input className="podcast-form-item" placeholder="Description" name="description" type="text" value={this.state.description} onChange={this.changeHandler}/><br/><br/>
              <input className="podcast-form-item" placeholder="toggle tracks or playlists" name="embedType" type="text" value={this.state.embedType} onChange={this.changeHandler}/> Ok to leave blank. This is used for switching between track or playlist<br/><br/>
              <input className="submit" type="submit" value="Update Podcast"/>
            </form>
            : ''}
          </div>
          <div className="delete" onClick={this.deleteConfirm}>
            <button>Delete</button>
          </div>
          {this.state.delete ? <div className="delete" onClick={(e) => this.props.deleteHandler(this.props.podcast.id, e)}>
            <button>Confirm Delete?</button>
          </div>: ''}
        </div>
        : ''}
      </div>
    )
  }
}

export default Podcast;
