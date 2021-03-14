import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Article from './Article'
import logo from '../assets/Echo-Musings_cropped.jpg'
import { getArticles } from '../actions/articleActions'
import { getPodcasts } from '../actions/podcastActions'
import '../App.scss';

class Home extends React.Component {
  componentDidMount() {
    this.props.getArticles()
    this.props.getPodcasts()
  }

  render(){
    let articles = this.props.articles.articles;
    let articleComponents;
    let latestArticle;
    let secondLatestArticle;
    try {
      if (articles !== undefined){
        articleComponents = articles.sort((a,b) => {return b.id - a.id}).map(article => {
          return <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: "inherit" }} key={article.id}><Article article={article} key={article.id} /></Link>
        })
      }
      latestArticle = articleComponents[0]
      secondLatestArticle = articleComponents[1]
    }
    catch {
      articleComponents = "News loading. Refresh if not loading. If not loading then come back later"
      latestArticle = "News loading. Refresh if not loading. If not loading then come back later"
      secondLatestArticle = "News loading. Refresh if not loading. If not loading then come back later"
    }

    let podcasts = this.props.podcasts.podcasts;
    let podcastFirst;
    let soundcloudUrlId;
    let soundcloudSource;
    try {
      if (podcasts !== undefined){
        podcasts = podcasts.sort((a,b) => {return b.id - a.id})
        podcastFirst = podcasts[0]
        if (podcastFirst !== undefined){
          soundcloudUrlId = podcastFirst.url
        }
      }
    }
    catch {
      podcastFirst = "Podcast loading. Refresh if not loading. If not loading then come back later"
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

const mapStateToProps = state => ({ articles: state.articles, podcasts: state.podcasts })

const mapDispatchToProps = { getArticles: getArticles, getPodcasts: getPodcasts }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
