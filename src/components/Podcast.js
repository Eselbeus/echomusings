import React from 'react'
import '../App.scss';

class Podcast extends React.Component {
  state = {
    title: '',
    subtitle: '',
    editButton: true,
    contentpt3: '',
    delete: false,
    edit: false
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  deleteHandler = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/podcasts/${this.props.podcast.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    let article = this.state.article
    let title = e.target.title.value || this.props.podcast.title
    let subtitle = e.target.subtitle.value || this.props.podcast.subtitle
    let id = this.props.podcast.id

    let config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        subtitle: subtitle
      })
    }

    fetch(`http://localhost:3000/api/v1/podcasts/${id}`, config)
      .then(res => res.json())
      .then(res => {this.setState({podcast: res, title: '',
        subtitle: ''
        })
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

    return(
      <div>
        <h2>{this.props.podcast.title}</h2>
        <h4>{this.props.podcast.subtitle}</h4>
        <div className="edit" onClick={this.editForm}>
          <button>Edit</button>
        </div>
        <div className="edit">
          {!!token ?
          <form onSubmit={this.submitHandler}>
            <input className="podcast-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
            <input className="podcast-form-item" placeholder="Subtitle" name="subtitle" type="text" value={this.state.subtitle} onChange={this.changeHandler}/><br/><br/>
            <input className="submit" type="submit" value="Update Podcast"/>
          </form>
          : ''}
        </div>
        <div className="delete" onClick={this.deleteConfirm}>
          <button>Delete</button>
        </div>
        {this.state.delete ? <div className="delete" onClick={this.deleteHandler}>
          <button>Confirm Delete?</button>
        </div>: ''}
      </div>
    )
  }
}

export default Podcast;
