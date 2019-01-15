import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'

import SiteLogo from '../../static/logos/logo.png'

const Header = () => {
  const user = useContext(UserContext)
  // console.log('Header.js', { user })
  return (
    <nav className="nav-bar-desktop">
      <Link to="/">
        <img src={SiteLogo} alt="site logo" className="site-logo-desktop" />
      </Link>
      <div className="nav-bar-desktop-authentication">
        {user ? <p>{user.displayName}</p> : <Link to="/login">Log in</Link>}
      </div>
    </nav>
  )
}

export default Header
