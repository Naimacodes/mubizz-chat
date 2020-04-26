import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './Logo.svg'
import socket from "../../socketConfig";

import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';



const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
   
      const username = user.name;
      const userID = user._id;

    logout();
    socket.emit('logout', { username, userID }, () => {})
    
  };

  console.log(socket)
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Log Out</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li >
        <Link  style={{ color: 'white' }} to='/login'>Login</Link>
      </li>
      <li>
        <Link style={{ color: 'white' }} to='/register'>Register</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar'>
      <img src={Logo} style={{height: "58px", width: "213px"}} alt="Logo" />
      <h2 style={{ color: 'white' }}>
        
        
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,

};

Navbar.defaultProps = {
  icon: 'fas fa-comment',
  title: 'Chat-app',
};

export default Navbar;
