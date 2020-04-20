import React from 'react';
import React, { useReducer } from 'react';
import socketReducer from './socketReducer';
import SocketContext from './socketContext';
import axios from 'axios';
import {} from '../types';

const SocketState = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer(socketReducer, initialState);

  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};

export default SocketState;
