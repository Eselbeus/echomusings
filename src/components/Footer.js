import React from 'react'
import '../App.scss';

const Footer = () => {
  let d = new Date();
  let year = d.getFullYear();
  return(
    <div>
      <p>Copyright © {year} - All rights reserved</p>
    </div>
  )
}

export default Footer;
