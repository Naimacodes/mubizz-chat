import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import {
  GET_CONVERSATIONS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
  ADD_PARTICIPANTS,
  SET_CURRENT_CONVERSATION,
  FILTER_CONVERSATION,
  CLEAR_FILTER,
} from '../types';

const ChatState = (props) => {
  const initialState = {
    contacts: null,
    conversations: [],
    conversation: null,
    currentConversation: null,
    filtered: null,
    message : null
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //GET_CONVERSATIONS
  //gets all the conversations of a user
  const getConversations = async () => {
    try {
      const res = await axios.get('/api/conversations');

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



  //SEND_CONVERSATION_MSGS
  const sendConversationMsgs = async (_id, message) => {
    try {
      const data = {_id, message}
      const res = await axios.post('/api/conversations/messages', data);
    
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }
  };

  //SET CURRENT CONVERSATION
  const setCurrentConversation = (conversation) => {
    dispatch({
      type: SET_CURRENT_CONVERSATION,
      payload: conversation,
    });
  };

  

  //FILTER_CONVERSATION,

  const filterConversation = (text) => {
    dispatch({ type: FILTER_CONVERSATION, payload: text });
  };

  //CLEAR_FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ChatContext.Provider
      value={{
        users: state.users,
        contacts: state.contacts,
        conversations: state.conversations,
        current: state.current,
        filtered: state.filtered,
        conversation: state.conversation,
        recipient: state.recipient,
        message: state.message,
        getConversations,
        sendConversationMsgs,
        setCurrentConversation,
        filterConversation,
        clearFilter,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatState;
