import React from 'react'
import '../App.scss';

class Contact extends React.Component {
  state = {
    name: '',
    email: '',
    message: '',
    sent: false
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let email = e.target.email.value
    let message = e.target.message.value
    this.setState({sent: !this.state.sent})

    fetch(`https://seann-devportfolio-api.herokuapp.com/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    }).then(res => res.json())
    .then(res => {})
  }

  // TODO: Future contact form implementation
  // <div className="contact-form">
  //   { !this.state.sent ?
  //     <form onSubmit={this.submitHandler}>
  //       <input className="contact-item" placeholder="Name" name="name" type="text" value={this.state.name} onChange={this.changeHandler}/><br/><br/>
  //       <input className="contact-item" placeholder="Email" name="email" type="text" value={this.state.email} onChange={this.changeHandler}/><br/><br/>
  //       <textarea className="contact-item message-input" placeholder="Message" name="message" type="text" value={this.state.message} onChange={this.changeHandler}></textarea><br/>
  //       <input className="submit" type="submit" value="SEND"/>
  //     </form>
  //      : <h2>Thank you for your message!</h2>
  //   }
  //   </div>
  // <h3>LinkedIn: <a href="https://www.linkedin.com/in/seannbranchfield/" target="_parent">LinkedIn</a></h3>
  // <h3>Blog: <a href="https://medium.com/@eselbeus" target="_parent">Blog</a></h3>
  // <h3>Email: <a href="mailto:eselbeus@gmail.com" target="_parent">Email</a></h3>


  render(){
    return (
      <div className="contact">
        <h1 className='pagehead'>Contact</h1>
        <h3>Email: <a href="mailto:echomusings@gmail.com" target="_parent">echomusings@gmail.com</a></h3>
      </div>
    )
  }
}

export default Contact;
