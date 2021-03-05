import React from 'react';
import { Link } from 'react-router-dom'
import Article from './Article'
import logo from '../assets/Echo-Musings_cropped.jpg'
import '../App.scss';

class Home extends React.Component {
  render(){

    let articles = this.props.articles;
    let articleComponents;
    try {
      if (articles !== undefined){
        articleComponents = articles.sort((a,b) => {return b.id - a.id}).map(article => {
          return <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: "inherit" }} key={article.id}><Article article={article} key={article.id} /></Link>
        })
      }
    }
    catch {
      articleComponents = "News loading. Refresh if not loading."
    }

    let latestArticle = articleComponents[0]
    let secondLatestArticle = articleComponents[1]

    let podcasts = this.props.podcasts;
    let podcastFirst;
    let soundcloudUrlId;
    let soundcloudSource;
    try {
      if (podcasts !== undefined){
        podcastFirst = podcasts[0]
        if (podcastFirst !== undefined){
          soundcloudUrlId = podcastFirst.url
        }
      }
    }
    catch {
      podcastFirst = "Podcast loading. Refresh if not loading."
    }

    soundcloudSource = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudUrlId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`


    return (
      <div className="Home">
        <img className="logo-home" src={logo}/>
        {podcastFirst ? <div><Link to={`/podcast`} style={{ textDecoration: 'none', color: "inherit" }}><div className="podcast-headline"><h3>Latest Echomusings Podcast Epidsode: {podcastFirst.title}</h3>
        </div></Link><div className="podcast-home">
          <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={soundcloudSource}></iframe><div className="iframePlayer"></div>
        </div></div> : ''}

        <div className="article-container">{latestArticle}{secondLatestArticle}</div>


      </div>
    );
  }
}

export default Home;
