import React, { useReducer } from 'react';
import chatReducer from './chatReducer';
import ChatContext from './chatContext';
import axios from 'axios';
import {
  GET_CONVERSATIONS,
  CONVERSATION_ERROR,
  ADD_MESSAGE,
  // GET_CURRENT_CONVERSATION,
  SET_CURRENT_CONVERSATION,
  FILTER_CONVERSATION,
  CLEAR_FILTER,
} from '../types';

const ChatState = (props) => {
  const initialState = {
    contacts: [],
    conversations: [],
    // currentConversation: null,
    conversation: null,
    // current: null,
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


  // //gets one specific conversation with _id
  // const getCurrentConversation =  async (_id) => {

  //   try {
  //     const res = await axios.get('api/conversations/messages/conversation');

  //     dispatch({
  //       type: GET_CURRENT_CONVERSATION,
  //       payload: res.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: CONVERSATION_ERROR,
  //       payload: err.response.msg,
  //     });
  //   }
    
  // }



//Sends message to the server
  const addMessageToServer = async (_id, message) => {
    try {
      const data = {_id, message}
      const res = await axios.post('/api/conversations/messages', data);
    
    } catch (error) {
      dispatch({ type: CONVERSATION_ERROR, payload: error.response.msg });
    }
  };





//for socket
const addMessage = (_id, message) => {
  dispatch({type: ADD_MESSAGE, payload: {_id, message}});
}; 


//SET CURRENT CONVERSATION
  const setCurrentConversation = (_id) => {
    dispatch({
      type: SET_CURRENT_CONVERSATION,
      payload: _id,
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
        contacts: state.contacts,
        conversations: state.conversations,
        current: state.current,
        filtered: state.filtered,
        conversation: state.conversation,
        messages: state.messages,
        getConversations,
        addMessageToServer,
        addMessage,
        // getCurrentConversation,
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
