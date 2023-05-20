import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', displayErrorMsg: false, errorMsg: ''}

  onChangeUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({displayErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, errorMsg, displayErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <form onSubmit={this.onSubmitForm} className="login-container">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input"
            onChange={this.onChangeUserInput}
            type="text"
            id="username"
            value={username}
            placeholder="Username"
          />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="input"
            onChange={this.onChangeUserPassword}
            type="password"
            id="password"
            placeholder="Password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {displayErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
