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
  console.log(typeof conversations)
  console.log(conversations[0])

  return(
    
    
      conversations.map( conversation => (
        
          <ConversationItem key={conversation._id} conversation = {conversation}></ConversationItem>
        
      ))
        
)
};

export default Conversations;
