import React from 'react';
import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './ChatContext';
import axios from 'axios';
import { GET_USER, GET_USERS_IN_ROOM, ADD_USER, REMOVE_USER } from '../types';

const ChatState = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{}}>{props.children}</ChatContext.Provider>
  );
};

export default ChatState;
