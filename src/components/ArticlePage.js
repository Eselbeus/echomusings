import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getArticles } from '../actions/articleActions'
import '../App.scss';

class ArticlePage extends React.Component {
  state = {
    article: {},
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
    contentpt4: '',
    delete: false
  }

  componentDidMount(){
    this.props.getArticles()
    let article_id = this.props.match.params.id
    console.log(article_id, "id")
    console.log(this.props, "art")
    article_id = parseInt(article_id)
    let articleInfo;
    if (this.props.articles.articles !== undefined){
      articleInfo = this.props.articles.articles.find((article) => {
        return article.id === article_id
      })
    }
    this.setState({article: articleInfo})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let article = this.state.article
    let title = e.target.title.value || article.title
    let author = e.target.author.value || article.author
    let date = e.target.date.value || article.date
    let imagelink = e.target.imagelink.value || article.imagelink
    let imagelink2 = e.target.imagelink2.value || article.imagelink2
    let imagelink3 = e.target.imagelink3.value || article.imagelink3
    let imagelink4 = e.target.imagelink4.value || article.imagelink4
    let content = e.target.content.value || article.content
    let contentpt2 = e.target.contentpt2.value || article.contentpt2
    let contentpt3 = e.target.contentpt3.value || article.contentpt3
    let contentpt4 = e.target.contentpt4.value || article.contentpt4
    let id = this.props.match.params.id

    let config = {
      method: "PATCH",
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
        contentpt4: contentpt4
      })
    }

    fetch(`https://echo-musings.herokuapp.com/articles/${id}`, config)
      .then(res => res.json())
      .then(res => {this.setState({article: res, title: '',
        imagelink: '',
        imagelink2: '',
        imagelink3: '',
        imagelink4: '',
        content: '',
        author: '',
        publication_date: '',
        contentpt2: '',
        contentpt4: '',
        contentpt3: ''})
      })
  }

  deleteHandler = (e) => {
    e.preventDefault()
    fetch(`https://echo-musings.herokuapp.com/api/v1/articles/${this.state.article.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    })
  }

  deleteConfirm = (e) => {
    e.preventDefault()
    this.setState({delete: true})
  }

  render(){
    let token = localStorage.getItem('token')
    return (
      <div className="article-page">
        <h2>{this.state.article ? this.state.article.title: ''}</h2>
        <h3>By {this.state.article ? this.state.article.author: ''}</h3>
        <h3>{this.state.article ? this.state.article.publication_date: ''}</h3>
        <p className='article-content'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.article ? this.state.article.content: ''}</p>
        {this.state.article ? <img className="articleimg-page" alt='' src={this.state.article.imagelink}/> : ''}
        <p className='article-content'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.article ? this.state.article.contentpt2: ''}</p>
        {this.state.article ? <img className="articleimg-page" alt='' src={this.state.article.imagelink2}/> : ''}
        <p className='article-content'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.article ? this.state.article.contentpt3: ''}</p>
        {this.state.article ? <img className="articleimg-page" alt='' src={this.state.article.imagelink3}/> : ''}
        <p className='article-content'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.article ? this.state.article.contentpt4: ''}</p>
        {this.state.article ? <img className="articleimg-page" alt='' src={this.state.article.imagelink4}/> : ''}

        <div className="edit">
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
            <input className="submit" type="submit" value="Edit Article"/>
          </form>
          : ''}
        </div>
        <br/>
        {!!token ?
        <div className="delete" onClick={this.deleteConfirm}>
          <button>Delete Article</button>
        </div>
        : ''}
        {this.state.delete ? <div className="delete" onClick={this.deleteHandler}>
          <Link to={`/articles`} style={{ textDecoration: 'none', color: "inherit" }}><button>Confirm Delete?</button></Link>
        </div>: ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({ articles: state.articles })

const mapDispatchToProps = { getArticles }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticlePage));
