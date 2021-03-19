import React from 'react'
import { NavLink } from 'react-router-dom'
import HamburgerMenu from 'react-hamburger-menu';
import '../App.scss';

class Nav extends React.Component {
  state = {
    open: false,
    hideOrShowHambugerDropDown: 'hamburgerDropDown',
    user: {}
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

  // logoutUser = () => {
  //   localStorage.clear()
  // }

  mobileNav = () => {
    let token = localStorage.getItem('token')
    return (
      <nav className='hamburgerDropDown nav-mobile'>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/">HOME</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/articles">ARTICLES</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/podcast">PODCAST</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/about">ABOUT</NavLink>
        <NavLink className="nav-elem" onClick={this.handleClick.bind(this)} to="/contact">CONTACT</NavLink>
        {!!token && this.props.currentUser.user ? <p className="nav-elem">Logged in as {this.props.currentUser.user.name}</p> : ''}
        {!!token ? <button className="nav-elem" onClick={this.props.logoutUser}>Logout</button> : ''}

      </nav>
    )
  }

  render(){
    let token = localStorage.getItem('token')

    return (
      <div className="nav-bar">
        <nav className="nav">
          <NavLink className="nav-elem" to="/">HOME</NavLink>
          <NavLink className="nav-elem" to="/articles">ARTICLES</NavLink>
          <NavLink className="nav-elem" to="/podcast">PODCAST</NavLink>
          <NavLink className="nav-elem" to="/about">ABOUT</NavLink>
          <NavLink className="nav-elem" to="/contact">CONTACT</NavLink>
          {!!token && this.props.currentUser.user ? <p className="nav-elem">Logged in as {this.props.currentUser.user.name}</p> : ''}
          {!!token ? <button className="nav-elem" onClick={this.props.logoutUser}>Logout</button> : ''}
        </nav>
        { this.state.open ?  this.mobileNav() : this.displayHamburgerMenu()}
      </div>
    )
  }
}

export default Nav;
