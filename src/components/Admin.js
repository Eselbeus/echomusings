import React from 'react'

class Admin extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    key: '',
    sent: false,
    signup: false,
    signin: false
  }

  signup = (e) => {
    this.setState({signup: !this.state.signup})
  }

  signin = (e) => {
    this.setState({signin: !this.state.signin})
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value
    let key = e.target.key.value
    this.setState({sent: !this.state.sent})

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        key: key
      })
    }).then(res => res.json())
    .then(res => {})
  }

  render(){
    return(
      <span className="admin-page">
        <div className='admin-forms'>
          {!this.state.signup ? <button onClick={this.signup}>Sign Up</button> :
          <div className="signup-form">
            <br/>
            { !this.state.sent ?
              <form onSubmit={this.submitHandler}>
                <input className="contact-item" placeholder="Name" name="name" type="text" value={this.state.name} onChange={this.changeHandler}/><br/><br/>
                <input className="contact-item" placeholder="Email" name="email" type="text" value={this.state.email} onChange={this.changeHandler}/><br/><br/>
                <input className="contact-item" placeholder="Password" name="password" type="text" value={this.state.password} onChange={this.changeHandler}/><br/><br/>
                <input className="contact-item" placeholder="Key" name="key" type="text" value={this.state.key} onChange={this.changeHandler}/><br/><br/>
                <input className="submit" type="submit" value="Create Account"/>
              </form>
               : <h2>Account Created!</h2>
            }
            </div>
          }
        </div>
        <div className='admin-forms'>
          {!this.state.signin ? <button onClick={this.signin}>Sign In</button> :
          <div className="signin-form">
            <br/>
            { !this.state.sent ?
              <form onSubmit={this.submitHandler}>
                <input className="contact-item" placeholder="Email" name="email" type="text" value={this.state.email} onChange={this.changeHandler}/><br/><br/>
                <input className="contact-item" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.changeHandler}/><br/><br/>
                <input className="submit" type="submit" value="Sign in"/>
              </form>
               : <h2>Logging in!</h2>
            }
            </div>
          }
        </div>
      </span>
    )
  }
}

export default Admin;
