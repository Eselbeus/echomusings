import React from 'react'
import { Link } from 'react-router-dom'
import Article from './Article'
import '../App.scss';

class Articles extends React.Component {
  state = {
    articles: [],
    title: '',
    imagelink: '',
    imagelink2: '',
    imagelink3: '',
    content: '',
    contentpt2: '',
    contentpt3: ''
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    let token = localStorage.getItem('token')
    let articles = this.props.articles;
    let articleComponents;
    if (articles !== undefined){
      articleComponents = articles.sort((a,b) => {return b.id - a.id}).map(article => {
        return <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: "inherit" }} key={article.id}><Article article={article} key={article.id} /></Link>
      })
    }
    return (
      <div className="articles">
        <h1>Articles</h1>
        {!!token ?
        <form onSubmit={this.props.submitHandler}>
          <input className="article-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
          <input className="article-form-item" placeholder="Image Link" name="imagelink" type="text" value={this.state.imagelink} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content" name="content" type="text" value={this.state.content} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 2" name="imagelink2" type="text" value={this.state.imagelink2} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content Pt. 2" name="contentpt2" type="text" value={this.state.contentpt2} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 3" name="imagelink3" type="text" value={this.state.imagelink3} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content Pt. 3" name="contentpt3" type="text" value={this.state.contentpt3} onChange={this.changeHandler}></textarea><br/>
          <input className="submit" type="submit" value="Create New Article"/>
        </form>
        : ''}
        <div className="article-container">{articleComponents}</div>
      </div>
    )
  }
}

export default Articles;
