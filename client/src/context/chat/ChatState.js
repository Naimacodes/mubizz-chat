import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import { GET_USER, GET_USERS_IN_ROOM, ADD_USER, REMOVE_USER } from '../types';

const ChatState = (props) => {
  const initialState = {
    users: null,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //ADD_USER
  //REMOVE_USER
  //GET_USER
  //GET_USERS_IN_ROOM

 
  return (
    <ChatContext.Provider value={{
      users: state.users
    }}>{props.children}</ChatContext.Provider>
  );
};

export default ChatState;
