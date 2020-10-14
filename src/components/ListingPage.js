import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'

class ListingPage extends React.Component {
  state = {
    listings: [],
    listing: {},
    address: '',
    sqfeet: '',
    price: '' ,
    bed: '',
    bath: '',
    imagelink: '',
    description: '',
    delete: false
  }

  componentDidMount(){
    fetch(`http://localhost:3000/listings`)
      .then(res => res.json())
      .then(listings => {
      this.setState({listings: listings})
        let listing_id = this.props.match.params.id
        listing_id = parseInt(listing_id)
        let listingInfo = 'test';
        if (this.state.listings !== undefined){
          listingInfo = this.state.listings.find((listing) => {
            return listing.id === listing_id
          })
        }
        this.setState({listing: listingInfo})}
    )

  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
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
    let id = this.props.match.params.id
    let config = {
      method: "PATCH",
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

    fetch(`http://localhost:3000/listings/${id}`, config)
      .then(res => res.json())
      .then(res => {this.setState({listing: res, address: '',
        sqfeet: '',
        price: '' ,
        bed: '',
        bath: '',
        imagelink: '',
        description: ''})
      })
  }

  deleteHandler = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/listings/${this.state.listing.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      }
    })
  }

  deleteConfirm = (e) => {
    e.preventDefault()
    this.setState({delete: true})
  }

  render(){

    return (
      <div className="listing-page">
        <h2>{this.state.listing ? this.state.listing.address: ''}</h2>
        <p>Sq. Feet: {this.state.listing ? this.state.listing.sqfeet: ''}</p>
        <p>Price ${this.state.listing ? this.state.listing.price: ''}</p>
        <p>{this.state.listing ? this.state.listing.bed: ''} Bed, {this.state.listing ? this.state.listing.bath: ''} Bath</p>
        <p>{this.state.listing ? this.state.listing.description: ''}</p>
        {this.state.listing ? <img className="houseimg" src={this.state.listing.imagelink}/> : ''}
        <div className="edit">
          <form onSubmit={this.submitHandler}>
            <input className="listing-form-item" placeholder="Address" name="address" type="text" value={this.state.address} onChange={this.changeHandler}/><br/><br/>
            <input className="listing-form-item" placeholder="Square Feet" name="sqfeet" type="text" value={this.state.sqfeet} onChange={this.changeHandler}/><br/><br/>
            <input className="listing-form-item" placeholder="Price" name="price" type="text" value={this.state.price} onChange={this.changeHandler}/><br/><br/>
            <input className="listing-form-item" placeholder="Bed" name="bed" type="text" value={this.state.bed} onChange={this.changeHandler}/><br/><br/>
            <input className="listing-form-item" placeholder="Bath" name="bath" type="text" value={this.state.bath} onChange={this.changeHandler}/><br/><br/>
            <input className="listing-form-item" placeholder="Image Link" name="imagelink" type="text" value={this.state.imagelink} onChange={this.changeHandler}/><br/><br/>
            <textarea className="contact-item message-input" placeholder="Description" name="description" type="text" value={this.state.description} onChange={this.changeHandler}></textarea><br/>
            <input className="submit" type="submit" value="Edit Listing"/>
          </form>
        </div>
        <br/>
        <div className="delete" onClick={this.deleteConfirm}>
          <button>Delete Listing</button>
        </div>
        {this.state.delete ? <div className="delete" onClick={this.deleteHandler}>
          <Link to={`/listings`} style={{ textDecoration: 'none', color: "inherit" }}><button>Confirm Delete?</button></Link>
        </div>: ''}
      </div>
    )
  }
}

export default ListingPage;
