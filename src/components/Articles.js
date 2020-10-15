import React from 'react'
import { Link } from 'react-router-dom'
import Article from './Article'
import '../App.css';

class Articles extends React.Component {
  state = {
    articles: [],
    title: '',
    imagelink: '',
    imagelink2: '',
    imagelink3: '',
    content: '',
    contentp2: ''
  }

  componentDidMount(){
    fetch(`http://localhost:3000/articles`)
      .then(res => res.json())
      .then(articles => this.setState({articles: articles}))
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let title = e.target.title.value
    let imagelink = e.target.imagelink.value
    let imagelink2 = e.target.imagelink2.value
    let imagelink3 = e.target.imagelink3.value
    let content = e.target.content.value
    let contentpt2 = e.target.contentpt2.value

    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        imagelink: imagelink,
        imagelink2: imagelink2,
        imagelink3: imagelink3,
        content: content,
        contentpt2: contentpt2
      })
    }

    if (title.length < 1){
      alert("Title cannot be blank")
    }
    else {
      fetch(`http://localhost:3000/articles`, config)
        .then(res => res.json())
        .then(res => {this.setState({articles: [...this.state.articles, res], title: '',
          imagelink: '',
          imagelink2: '',
          imagelink3: '',
          content: '',
          contentp2: ''})
        })

    }
  }

  render(){
    let articles = this.state.articles;
    let articleComponents;
    if (articles !== undefined){
      articleComponents = articles.map(article => {
        return <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: "inherit" }}><Article article={article} key={article.id} /></Link>
      })
    }
    return (
      <div className="articles">
        <h1>Articles</h1>
        <form onSubmit={this.submitHandler}>
          <input className="article-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
          <input className="article-form-item" placeholder="Image Link" name="imagelink" type="text" value={this.state.imagelink} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content" name="content" type="text" value={this.state.content} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 2" name="imagelink2" type="text" value={this.state.imagelink2} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content Pt. 2" name="contentpt2" type="text" value={this.state.contentpt2} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 3" name="imagelink3" type="text" value={this.state.imagelink3} onChange={this.changeHandler}/><br/><br/>
          <input className="submit" type="submit" value="Create New Article"/>
        </form>
        <div className="article-container">{articleComponents}</div>
      </div>
    )
  }
}

export default Articles;
