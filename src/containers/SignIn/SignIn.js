import React, { Component } from 'react';
import { fetchData } from '../../utils/fetch';
import { fetchAllFavorites } from '../../utils/helpers';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logInUser, addAllFavorites, addMessage } from '../../actions';
import propTypes from 'prop-types';

export class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      status: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSignIn = async (e) => {
    const { addMessage } = this.props
    e.preventDefault();
    const url = 'http://localhost:3000/api/users'
    const userInput = this.state
    const userOptionObject = {
      method: "POST",
      body: JSON.stringify(userInput),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetchData(url, userOptionObject)
    if(response.status === 'success') {
      this.props.logInUser(response.data)
      const userFavorites = await fetchAllFavorites(response.data.id)
      this.props.addFavoritesToState(userFavorites)
      addMessage('Welcome Back.')
      setTimeout(() => {
        addMessage('')
      }, 3000)
    } else {
      addMessage('Sorry, we could not find that account.')
      setTimeout(() => {
        addMessage('')
      }, 3000)
    }
    this.setState({ status: response.status })
  }
  
  render() {
    const { status } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSignIn} className="form">
        <Link to={'/'} className='back-btn'>Back To Home</Link>
          <div className="input-container">
            <input
              value={this.state.email}
              name='email'
              placeholder="Email"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              value={this.state.password}
              type='password'
              name='password'
              placeholder="Password"
              onChange={this.handleChange}
              className="input"
            />
          </div>
          {status === 'success' &&
            <Redirect to='/' />
          }
          <button className="sign-in-btn">Sign In</button>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  logInUser: (user) => dispatch(logInUser(user)),
  addFavoritesToState: (favorite) => dispatch(addAllFavorites(favorite)),
  addMessage: (message) => dispatch(addMessage(message))
})

export default connect(null, mapDispatchToProps)(SignIn)

SignIn.propTypes = {
  logInUser: propTypes.func,
  addFavoritesToState: propTypes.func,
  addMessage: propTypes.func
}