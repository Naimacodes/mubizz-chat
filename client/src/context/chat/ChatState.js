import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import { GET_CONVERSATION, GET_CONVERSATION_MSGS, SEND_CONVERSATION_MSGS} from '../types';

const ChatState = (props) => {
  const initialState = {
    users: null,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);


  //GET_CONVERSATION
  //GET_CONVERSATION_MSGS
  //SEND_CONVERSATION_MSGS


 
  return (
    <ChatContext.Provider value={{
      users: state.users
    }}>{props.children}</ChatContext.Provider>
  );
};

export default ChatState;
