import {
  GET_CONVERSATIONS,
  GET_CONVERSATION_MSGS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
  ADD_PARTICIPANTS,
  FILTER_CONVERSATION,
  CLEAR_FILTER,
  SET_CURRENT_CONVERSATION,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
        loading: false,
      };
    case GET_CONVERSATION_MSGS:
      return {
        ...state,
        something: action.payload,
      };
    case SEND_CONVERSATION_MSGS:
      return {
        ...state,
        something: action.payload,
      };
    case CONVERSATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_PARTICIPANTS:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CURRENT_CONVERSATION:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case FILTER_CONVERSATION:
      return {
        ...state,
        filtered: state.conversations.filter((conversation) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          for (let i = 0; i < conversation.recipients.length; i++) {
            return conversation.recipients[i].match(regex);
          }
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return {
        ...state,
      };
  }
};
