import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

class Listing extends React.Component {
  render(){
    return (
      <div className="listing">
        <h1>{this.props.listing.address}</h1>
        <p>Sq. Feet: {this.props.listing.sqfeet}</p>
        <p>Price ${this.props.listing.price}</p>
        <p>{this.props.listing.bed} Bed, {this.props.listing.bath} Bath</p>

      </div>
    )
  }
}

export default Listing;
