import React, { useContext, useEffect, Fragment } from 'react';
import ConversationItem from './ConversationItem';
import ListConversation from './ListConversation'
import ChatContext from '../../context/chat/chatContext'


const Conversations = () => {
  const chatContext = useContext(ChatContext);
  const { conversations, getConversations } = chatContext;
    


  useEffect(() => {
    getConversations();
    
  }, []);

  

  return(
    
    
      conversations.map( conversation => (
        
          <ConversationItem key={conversation._id} conversation = {conversation} ></ConversationItem>
        
      ))
        
)
};

export default Conversations;
