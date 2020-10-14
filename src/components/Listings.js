import React from 'react'
import { Link } from 'react-router-dom'
import Listing from './Listing'
import '../App.css';

class Listings extends React.Component {
  state = {
    listings: [],
    address: '',
    sqfeet: '',
    price: '' ,
    bed: '',
    bath: '',
    imagelink: '',
    description: ''
  }

  componentDidMount(){
    fetch(`http://localhost:3000/listings`)
      .then(res => res.json())
      .then(listings => this.setState({listings: listings}))
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
    console.log(e.target.value)
  }

  submitHandler = (e) => {
    e.preventDefault()
    let address = e.target.address.value
    let price = e.target.price.value
    let sqfeet = e.target.sqfeet.value
    let bed = e.target.bed.value
    let bath = e.target.bath.value
    let imagelink = e.target.imagelink.value
    let description = e.target.description.value
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        address: address,
        sqfeet: sqfeet,
        price: price,
        bed: bed,
        bath: bath,
        imagelink: imagelink,
        description: description
      })
    }

    fetch(`http://localhost:3000/listings`, config)
      .then(res => res.json())
      .then(res => {this.setState({listings: [...this.state.listings, res]})})
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
        <form onSubmit={this.submitHandler}>
          <input className="listing-form-item" placeholder="Address" name="address" type="text" value={this.state.address} onChange={this.changeHandler}/><br/><br/>
          <input className="listing-form-item" placeholder="Square Feet" name="sqfeet" type="text" value={this.state.sqfeet} onChange={this.changeHandler}/><br/><br/>
          <input className="listing-form-item" placeholder="Price" name="price" type="text" value={this.state.price} onChange={this.changeHandler}/><br/><br/>
          <input className="listing-form-item" placeholder="Bed" name="bed" type="text" value={this.state.bed} onChange={this.changeHandler}/><br/><br/>
          <input className="listing-form-item" placeholder="Bath" name="bath" type="text" value={this.state.bath} onChange={this.changeHandler}/><br/><br/>
          <input className="listing-form-item" placeholder="Image Link" name="imagelink" type="text" value={this.state.imagelink} onChange={this.changeHandler}/><br/><br/>
          <textarea className="contact-item message-input" placeholder="Description" name="description" type="text" value={this.state.description} onChange={this.changeHandler}></textarea><br/>
          <input className="submit" type="submit" value="Create New Listing"/>
        </form>
        <div className="listing-container">{listingComponents}</div>
      </div>
    )
  }
}

export default Listings;
