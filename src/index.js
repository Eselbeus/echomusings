import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Nav from './components/Nav'
import About from './components/About'
import Contact from './components/Contact'
import Listings from './components/Listings'
import Listing from './components/Listings'
import ListingPage from './components/ListingPage'
import Testimonials from './components/Testimonials'

ReactDOM.render(
  <Router>
    <Nav />
    <Route exact path='/about' component={About} />
    <Route exact path='/contact' component={Contact} />
    <Route exact path='/listings' component={Listings} />
    <Route exact path='/listings/:id' component={ListingPage} />
    <Route exact path='/testimonials' component={Testimonials} />
    <Route exact path='/' component={App} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
