import {
  GET_CONVERSATIONS,
  CONVERSATION_ERROR,
  ADD_MESSAGE,
  FILTER_CONVERSATION,
  CLEAR_FILTER,
  GET_CURRENT_CONVERSATION,
  SET_CURRENT_CONVERSATION,
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
    case SET_CURRENT_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
        loading: false,
      };

    case GET_CURRENT_CONVERSATION:
      return {
        ...state,
        currentConversation: action.payload,
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
      return {
        ...state,
        conversation: state.conversations
          .map((conversation) => {
            if (conversation._id === action._id) {
              return {
                ...conversation,
                messages: [...conversation.messages, action.message],
              };
            }
          })
          .sort(compare),
        // current: state.current.messages
        //   .push([...state.current.messages, action.message])
        //   .sort(compare),
      };
    default:
      return {
        ...state,
      };
  }
};
