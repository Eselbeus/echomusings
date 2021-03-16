import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Article from './Article'
import { getArticles } from '../actions/articleActions'
import { postArticle } from '../actions/articleActions'
import '../App.scss';

class Articles extends React.Component {
  state = {
    title: '',
    author: '',
    date: '',
    imagelink: '',
    imagelink2: '',
    imagelink3: '',
    imagelink4: '',
    content: '',
    contentpt2: '',
    contentpt3: '',
    contentpt4: ''
  }

  componentDidMount() {
    this.props.getArticles()
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let title = e.target.title.value
    let author = e.target.author.value
    let date = e.target.date.value
    let imagelink = e.target.imagelink.value
    let imagelink2 = e.target.imagelink2.value
    let imagelink3 = e.target.imagelink3.value
    let imagelink4 = e.target.imagelink4.value
    let content = e.target.content.value
    let contentpt2 = e.target.contentpt2.value
    let contentpt3 = e.target.contentpt3.value
    let contentpt4 = e.target.contentpt4.value
    let user_id = this.props.currentUser.user.id

    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: title,
        author: author,
        publication_date: date,
        imagelink: imagelink,
        imagelink2: imagelink2,
        imagelink3: imagelink3,
        imagelink4: imagelink4,
        content: content,
        contentpt2: contentpt2,
        contentpt3: contentpt3,
        contentpt4: contentpt4,
        user_id: user_id
      })
    }

    if (title.length < 1){
      alert("Title cannot be blank")
    }
    else {
      this.props.postArticle(user_id, config)
    }
  }

  render(){
    let token = localStorage.getItem('token')
    let articles = this.props.articles.articles;
    let articleComponents;
    try {
      if (articles !== undefined){
        articleComponents = articles.sort((a,b) => {return b.id - a.id}).map(article => {
          return <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: "inherit" }} key={article.id}><Article article={article} key={article.id} /></Link>
        })
      }
    }
    catch {
      articleComponents = "News loading. Refresh if not loading. If not loading then come back later"
    }

    return (
      <div className="articles">
        <h1>Articles</h1>
        {!!token ?
        <form onSubmit={this.submitHandler}>
          <input className="article-form-item" placeholder="Title" name="title" type="text" value={this.state.title} onChange={this.changeHandler}/><br/><br/>
          <input className="article-form-item" placeholder="Author" name="author" type="text" value={this.state.author} onChange={this.changeHandler}/><br/><br/>
          <input className="article-form-item" placeholder="Date" name="date" type="text" value={this.state.date} onChange={this.changeHandler}/><br/><br/>
          <input className="article-form-item" placeholder="Image Link" name="imagelink" type="text" value={this.state.imagelink} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content" name="content" type="text" value={this.state.content} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 2" name="imagelink2" type="text" value={this.state.imagelink2} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content Pt. 2" name="contentpt2" type="text" value={this.state.contentpt2} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 3" name="imagelink3" type="text" value={this.state.imagelink3} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content Pt. 3" name="contentpt3" type="text" value={this.state.contentpt3} onChange={this.changeHandler}></textarea><br/>
          <input className="article-form-item" placeholder="Image Link 4" name="imagelink4" type="text" value={this.state.imagelink4} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Content Pt. 4" name="contentpt4" type="text" value={this.state.contentpt4} onChange={this.changeHandler}></textarea><br/>
          <input className="submit" type="submit" value="Create New Article"/>
        </form>
        : ''}
        <div className="article-container">{articleComponents}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ articles: state.articles })

const mapDispatchToProps = { getArticles, postArticle }

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
