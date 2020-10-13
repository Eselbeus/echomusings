import React from 'react'
import { Link } from 'react-router-dom'
import Listing from './Listing'
import '../App.css';

class Listings extends React.Component {
  state = {
    listings: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/listings`)
      .then(res => res.json())
      .then(listings => this.setState({listings: listings}, console.log(listings)))
  }

  render(){
    let listings = this.state.listings;
    let listingComponents;
    if (listings !== undefined){
      listingComponents = listings.map(listing => {
        return <Link to={`/listings/${listing.id}`} style={{ textDecoration: 'none', color: "inherit" }}><Listing listing={listing} key={listing.id} /></Link>
      })
    }
    return (
      <div className="listings">
        <h1>Listings</h1>
        <div className="listing-container">{listingComponents}</div>
      </div>
    )
  }
}

export default Listings;
