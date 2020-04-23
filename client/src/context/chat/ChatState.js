import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import {
  GET_CONVERSATIONS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
  ADD_PARTICIPANTS,
  ADD_MESSAGE,
  SET_CURRENT_CONVERSATION,
  FILTER_CONVERSATION,
  CLEAR_FILTER,
  UPDATE_LAST_MESSAGE_READ
} from '../types';

const ChatState = (props) => {
  const initialState = {
    contacts: [],
    conversations: [],
    currentConversation: null,
    filtered: null,
    messages : []
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  //GET_CONVERSATIONS
  //gets all the conversations of a user
  const getConversations = async () => {
    try {
      const res = await axios.get('api/conversations');

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



  //SEND_CONVERSATION_MSGS to the server
  const addMessageToServer = async (_id, message) => {
    try {
      const data = {_id, message}
      const res = await axios.post('/api/conversations/messages', data);
    
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }
  };






const addMessage = (_id, message) => {
  return dispatch => dispatch({type: ADD_MESSAGE, payload: _id, message});
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
        messages: state.messages,
        getConversations,
        addMessageToServer,
        addMessage,
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
