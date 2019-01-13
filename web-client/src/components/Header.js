import React from 'react'
import { Link } from 'react-router-dom'
import SiteLogo from '../../static/logos/logo.png'

const Header = () => {
  return (
    <nav className="nav-bar-desktop">
      <Link to="/">
        <img src={SiteLogo} alt="site logo" className="site-logo-desktop" />
      </Link>
      <div className="nav-bar-desktop-authentication">
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </nav>
  )
}

export default Header
