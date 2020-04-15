import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import Messages from '../Messages/Messages';
import Conversations from '../Sidepanel/Conversations';
import SearchConversation from '../Sidepanel/SearchConversation';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <div className='inbox_people'>
          <SearchConversation />

          <Conversations></Conversations>
        </div>

        <Messages></Messages>
      </div>
    </div>
  );
};

export default Home;
