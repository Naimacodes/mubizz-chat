import {
  GET_CONVERSATIONS,
  GET_CONVERSATION_MSGS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
  ADD_PARTICIPANTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        something: action.payload,
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
    default:
      return {
        ...state,
      };
  }
};
