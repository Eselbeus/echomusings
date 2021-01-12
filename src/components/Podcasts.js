import React from 'react'
import Podcast from './Podcast'
import '../App.scss';

class Podcasts extends React.Component {
  state = {
    podcasts: [],
    title: '',
    subtitle: '',
    url: ''
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/podcasts`)
      .then(res => res.json())
      .then(podcasts => this.setState({podcasts: podcasts}))
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let title = e.target.title.value
    let subtitle = e.target.subtitle.value
    let url = e.target.url.value
    console.log('test')
    debugger
    let urlArr = url.split("tracks/")
    let nextPart = urlArr[1].split("&color")
    url = nextPart[0]
    console.log(url, "url")
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
        user_id: user_id
      })
    }

    if (title.length < 1){
      alert("Title cannot be blank")
    }
    else {
      fetch(`http://localhost:3000/api/v1/podcasts`, config)
        .then(res => res.json())
        .then(res => {this.setState({podcasts: [...this.state.podcasts, res], title: '',
          subtitle: '', url: ''})
        })

    }
  }

  render(){
    let token = localStorage.getItem('token')
    let podcasts = this.state.podcasts;
    let podcastComponents;
    if (podcasts !== undefined){
      podcastComponents = podcasts.map(podcast => {
        return <Podcast podcast={podcast} key={podcast.id} />
      })
    }
    return (
      <div className="podcasts">
        {!!token ?
        <div>
          <h1>Podcast</h1>
          <p>So and so decided to do an interview with us. It's awesome.</p>
          <form onSubmit={this.submitHandler}>
            <input className="article-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
            <input className="article-form-item" placeholder="Subtitle" name="subtitle" type="text" value={this.state.subtitle} onChange={this.changeHandler}/><br/><br/>
            <input className="article-form-item" placeholder="Url" name="url" type="text" value={this.state.url} onChange={this.changeHandler}/><br/><br/>
            <input className="submit" type="submit" value="Create New Podcast"/>
          </form>
        </div> : ''}
        <div className="podcast-container">{podcastComponents}</div>
      </div>
    )
  }
}

export default Podcasts;
