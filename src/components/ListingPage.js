import React from 'react'
import '../App.css';

class ListingPage extends React.Component {
  state = {
    listings: [],
    listing: {}
  }

  componentDidMount(){
    fetch(`http://localhost:3000/listings`)
      .then(res => res.json())
      .then(listings => this.setState({listings: listings}, console.log(listings)))
  }

  render(){
    let listing_id = this.props.match.params.id
    listing_id = parseInt(listing_id)
    let listingInfo = "test";
    if (this.state.listings !== undefined){
      listingInfo = this.state.listings.find((listing) => {
        return listing.id === listing_id
      })
    }
    return (
      <div className="listing-page">
        <h2>{listingInfo ? listingInfo.address: ''}</h2>
        <p>Sq. Feet: {listingInfo ? listingInfo.sqfeet: ''}</p>
        <p>Price ${listingInfo ? listingInfo.price: ''}</p>
        <p>{listingInfo ? listingInfo.bed: ''} Bed, {listingInfo ? listingInfo.bath: ''} Bath</p>
        <p>{listingInfo ? listingInfo.description: ''}</p>
        {listingInfo ? <img className="houseimg" src={listingInfo.imagelink}/> : ''}
      </div>
    )
  }
}

export default ListingPage;
