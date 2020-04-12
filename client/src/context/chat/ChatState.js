import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION_MSGS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
} from '../types';

const ChatState = (props) => {
  const initialState = {
    users: null,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //GET_CONVERSATIONS
  //gets all the conversations of a user
  const getConversations = async () => {
    try {
      const res = await axios.get('/api/messages/conversations');

      dispatch({
        type: GET_CONVERSATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONVERSATION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  
  //GET_CONVERSATION_MSGS
  const getConversationMsgs = async (id) => {
    try {
      const res = await axios.get(`/api/messages/conversations/query?userId=${id}`);

      dispatch({
        type: GET_CONVERSATION_MSGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONVERSATION_ERROR,
        payload: err.response.msg,
      });
    }
  }
  

  //SEND_CONVERSATION_MSGS
  const sendConversationMsgs= async (id, body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({ to: id, body: body }),
      }
    };
    try {
      const res = await axios.post('/api/messages', id, body, config);
      dispatch({ type: SEND_CONVERSATION_MSGS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }

  }

  return (
    <ChatContext.Provider
      value={{
        users: state.users,
        getConversations,
        getConversationMsgs,
        sendConversationMsgs
      
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatState;
