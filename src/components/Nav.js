import React from 'react'
import { BrowserRouter as Link, NavLink, Router } from 'react-router-dom'
import HamburgerMenu from 'react-hamburger-menu';
import '../App.css';

class Nav extends React.Component {
  state = {
    open: false,
    hideOrShowHambugerDropDown: 'hamburgerDropDown'
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  }

  handleClick2 = () => {
    this.setState({open: false});
  }

  displayHamburgerMenu = () => {
    return (
      <HamburgerMenu
        isOpen={this.state.open}
        menuClicked={this.handleClick.bind(this)}
        width={22}
        height={18}
        strokeWidth={2}
        rotate={0}
        color='#999999'
        borderRadius={0}
        animationDuration={0.5}
      />
    )
  }

  mobileNav = () => {
    return (
      <nav className='hamburgerDropDown nav-mobile'>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/">HOME</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/articles">BLOG</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/interviews">INTERVIEWS</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/about">ABOUT</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/contact">GET IN TOUCH</NavLink>
      </nav>
    )
  }

  render(){
    return (
      <div className="nav-bar">
        <nav className="nav">
          <NavLink className="nav-elem" to="/">HOME</NavLink>
          <NavLink className="nav-elem" to="/articles">BLOG</NavLink>
          <NavLink className="nav-elem" to="/interviews">INTERVIEWS</NavLink>
          <NavLink className="nav-elem" to="/about">ABOUT</NavLink>
          <NavLink className="nav-elem" to="/contact">CONTACT</NavLink>
        </nav>
        { this.state.open ?  this.mobileNav() : this.displayHamburgerMenu()}
      </div>
    )
  }
}

export default Nav;
