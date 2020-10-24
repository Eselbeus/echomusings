import React from 'react'
import '../App.scss';

class Article extends React.Component {
  render(){
    return (
      <div className="article">
        <h1>{this.props.article.title}</h1>
        <img className="articleimg" alt='' src={this.props.article.imagelink}/>
      </div>
    )
  }
}

export default Article;
