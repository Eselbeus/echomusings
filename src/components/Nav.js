import React from 'react'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'
import '../App.css';

class Nav extends React.Component {
  render(){
    return (
      <div className="nav-bar">
        <nav className="nav">
          <NavLink className="nav-elem" to="/">HOME</NavLink>
          <NavLink className="nav-elem" to="/listings">LISTINGS</NavLink>
          <NavLink className="nav-elem" to="/testimonials">TESTIMONIALS</NavLink>
          <NavLink className="nav-elem" to="/about">ABOUT</NavLink>
          <NavLink className="nav-elem" to="/contact">CONTACT</NavLink>
        </nav>
      </div>
    )
  }
}

export default Nav;
