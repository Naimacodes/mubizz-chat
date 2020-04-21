import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import Home from './Home'



const Homepage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
        <Home user={user}></Home>

  );
};

export default Homepage;
