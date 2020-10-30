import React from 'react';
import { Link } from 'react-router-dom'
import Article from './Article'
import '../App.scss';

class Home extends React.Component {
  render(){

    let articles = this.props.articles;
    let articleComponents;
    if (articles !== undefined){
      articleComponents = articles.sort((a,b) => {return b.id - a.id}).map(article => {
        return <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: "inherit" }} key={article.id}><Article article={article} key={article.id} /></Link>
      })
    }

    let latestArticle = articleComponents[0]
    let secondLatestArticle = articleComponents[1]

    return (
      <div className="App">
        <h1>Lutz Watch</h1>
        <br/>
        <p>Insert Awesome Professional Pic Here</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Here's what site is about!</p>
        <div className="article-container">{latestArticle}{secondLatestArticle}</div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Insert more cool info here!</p>
      </div>
    );
  }
}

export default Home;
