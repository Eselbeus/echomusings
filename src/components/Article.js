import React from 'react'
import '../App.scss';

class Article extends React.Component {
  render(){
    return (
      <div className="article">
        <h3 className="article-name">{this.props.article.title}</h3>
        <img className="articleimg" alt='' src={this.props.article.imagelink}/>
      </div>
    )
  }
}

export default Article;
