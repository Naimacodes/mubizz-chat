import {
  GET_CONVERSATIONS,
  SEND_CONVERSATION_MSGS,
  CONVERSATION_ERROR,
  ADD_MESSAGE,
  ADD_PARTICIPANTS,
  FILTER_CONVERSATION,
  CLEAR_FILTER,
  SET_CURRENT_CONVERSATION,
  UPDATE_LAST_MESSAGE_READ
} from '../types';

const compare = (c1, c2) => {
  const c1NumMsgs = c1.messages.length;
  const c2NumMsgs = c2.messages.length;
  if (!c2NumMsgs) return 1;
  if (!c1NumMsgs) return -1;

  const c1Date = c1.messages[c1NumMsgs - 1].date;
  const c2Date = c2.messages[c2NumMsgs - 1].date;

  if (c1Date > c2Date) return -1;
  if (c1Date < c2Date) return 1;
  return 0;
};

export default (state, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.sort(compare),
        loading: false,
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
          return null;
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ADD_MESSAGE:
      return state
        .map((conversation) => {
          if (conversation._id === action._id) {
            return {
              ...conversation,
              messages: [...conversation.messages, action.message],
            };
          }
          return conversation;
        })
        .sort(compare);
    case UPDATE_LAST_MESSAGE_READ:
      return state.map((conversation) => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            lastMessageRead: action.lastMessageRead,
          };
        }
        return conversation;
      });
    default:
      return {
        ...state,
      };
  }
};
