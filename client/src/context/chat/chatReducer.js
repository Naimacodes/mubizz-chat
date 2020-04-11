import { GET_USER, GET_USERS_IN_ROOM, REMOVE_USER, ADD_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
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
