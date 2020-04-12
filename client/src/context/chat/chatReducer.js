import {
  GET_CONVERSATION,
  GET_CONVERSATION_MSGS,
  SEND_CONVERSATION_MSGS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONVERSATION:
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
    default:
      return {
        ...state,
      };
  }
};
