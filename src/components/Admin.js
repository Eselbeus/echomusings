import React from 'react'
import '../App.scss';

class Admin extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    key: '',
    sent: false,
    signup: false,
    signin: false,
    user: {}
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

  render(){
    return(
      <span className="admin-page">
        <div className='admin-forms'>
          {!this.state.signup ? <button onClick={this.signup}>Sign Up</button> :
          <div className="signup-form">
            <br/>
            { !this.state.sent ?
              <form onSubmit={this.props.signupHandler}>
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
              <form onSubmit={this.props.loginHandler}>
                <input className="contact-item" placeholder="Email" name="email" type="text" value={this.state.email} onChange={this.changeHandler}/><br/><br/>
                <input className="contact-item" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.changeHandler}/><br/><br/>
                <input className="submit" type="submit" value="Sign in"/>
              </form>
               : <h2>Logging in!{!!this.state.user ? <p>Hi {this.state.user.name}</p>:''}</h2>
            }
            </div>
          }
        </div>
      </span>
    )
  }
}

export default Admin;
