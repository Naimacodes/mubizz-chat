import React, { useContext, useEffect} from 'react';
import Chat from '../Chat/Chat'
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {

    authContext.loadUser()
        // eslint-disable-next-line
  }, [])
  return (
    <div className='grid-2'>
      <div>
        <Chat />
      </div>
  
    </div>
  );
};

export default Home;