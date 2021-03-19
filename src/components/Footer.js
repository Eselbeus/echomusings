import React from 'react'
import ig from '../assets/ig-icon.png'
import fb from '../assets/fb-icon.png'
import tw from '../assets/tw-icon.png'
import tt from '../assets/tt-icon.png'
import '../App.scss';

const Footer = () => {
  let d = new Date();
  let year = d.getFullYear();
  return(
    <div>
    <span className="social-icons">
      <a href="https://www.instagram.com/echomusings/"><img className="social-icon" src={ig} alt="instagram"/></a>
      <a href="https://www.tiktok.com/@echomusings"><img className="social-icon" src={tt} alt="tiktok"/></a>
      <a href="https://twitter.com/EchoMusings"><img className="social-icon" src={tw} alt="twitter"/></a>
      <a href="https://www.facebook.com/Echo-Musings-104359551741069"><img className="social-icon" src={fb} alt="facebook"/></a>
    </span>
      <p>Copyright © {year} - All rights reserved</p>
    </div>
  )
}

export default Footer;
