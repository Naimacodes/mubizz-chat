import React, { useEffect, useState } from 'react';
// import './Chat.css';
import ListConversation from '../Sidepanel/ListConversation'
import Conversations from '../Sidepanel/Conversations'
import InfoBar from '../Infobar/InfoBar';




const Chat = () => {


  return (
    <div >
      <div >
        <ListConversation></ListConversation>
        <Conversations></Conversations>
        <InfoBar />
        

      </div>
      
    </div>
  );
};

export default Chat;
