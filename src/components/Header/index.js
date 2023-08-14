import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiHome} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="header1">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo1"
            />
          </Link>
        </div>
        <ul className="icons-container">
          <Link to="/">
            <li className="icon-button" type="button">
              <BiHome className="home-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="icon-button" type="button">
              <BsSearch className="home-icon" />
            </li>
          </Link>
          <li>
            <button
              onClick={onClickLogout}
              className="icon-button"
              type="button"
            >
              <FiLogOut className="home-icon" />
            </button>
          </li>
        </ul>
      </div>
      <div className="header2">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </div>
        <ul className="route-container">
          <Link to="/">
            <li className="name-button" type="button">
              Home
            </li>
          </Link>
          <Link to="/jobs">
            <li className="name-button" type="button">
              Jobs
            </li>
          </Link>
          <li>
            <button
              onClick={onClickLogout}
              className="header-logout-button"
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
