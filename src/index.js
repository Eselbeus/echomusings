import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Nav from './components/Nav'
import About from './components/About'
import Contact from './components/Contact'
import Articles from './components/Articles'
import Article from './components/Article'
import ArticlePage from './components/ArticlePage'
import Interviews from './components/Interviews'
import Admin from './components/Admin'

ReactDOM.render(
  <Router>
    <Nav />
    <Route exact path='/about' component={About} />
    <Route exact path='/admin' component={Admin} />
    <Route exact path='/contact' component={Contact} />
    <Route exact path='/articles' component={Articles} />
    <Route exact path='/articles/:id' component={ArticlePage} />
    <Route exact path='/interviews' component={Interviews} />
    <Route exact path='/' component={App} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
