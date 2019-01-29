import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'

import SiteLogo from '../../static/logos/logo.png'

const Header = () => {
  const user = useContext(UserContext)
  return (
    <Menu secondary style={styles.menu}>
      <Menu.Item as={Link} to="/">
        <Image src={SiteLogo} alt="site logo" size="mini" />
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? (
          <Menu.Item as={Link} to="/me">
            <span style={styles.user}>{user.displayName}</span>
            <Image src={user.photoURL} avatar />
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/login" style={styles.login}>
            Log in
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  )
}

const styles = {
  menu: {
    'margin-bottom': '0px',
    'background-color': '#0849b9'
  },
  login: {
    color: '#f0f8ff',
    'font-size': '12px'
  },
  user: {
    padding: '5px',
    color: '#f0f8ff',
    'font-size': '12px'
  }
}

export default Header
