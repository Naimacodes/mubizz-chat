import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION_MSGS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
  ADD_PARTICIPANTS,
  SET_CURRENT_CONVERSATION,
  FILTER_CONVERSATION,
  CLEAR_FILTER
} from '../types';

const ChatState = (props) => {
  const initialState = {
    users: null,
    contacts: null,
    conversations: [],
    currentConversation: null,
    filtered: null,
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
        
      })
      
    } catch (err) {
      dispatch({
        type: CONVERSATION_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //GET_CONVERSATION_MSGS
  //get all the messages from a conversation
  const getConversationMsgs = async (id) => {
    try {
      const res = await axios.get(
        `/api/messages/conversations/query?userId=${id}`
      );

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
  };

  //SEND_CONVERSATION_MSGS
  const sendConversationMsgs = async (id, message) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({ to: id, body: message }),
      },
    };
    try {
      const res = await axios.post('/api/messages', id, message, config);
      dispatch({ type: SEND_CONVERSATION_MSGS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }
  };



  //SET CURRENT CONVERSATION
  const setCurrentConversation = id => {
    dispatch({
      type: SET_CURRENT_CONVERSATION,
      payload: id,
    });
};


//FILTER_CONVERSATION,

const filterConversation = text => {
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
        currentConversation: state.currentConversation,
        filtered: state.filtered,
        getConversations,
        getConversationMsgs,
        sendConversationMsgs,
        setCurrentConversation,
        filterConversation,
        clearFilter
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
export default ChatState;
