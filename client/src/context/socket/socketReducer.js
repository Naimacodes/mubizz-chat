import {} from '../types';

export default (state, action) => {
  switch (action.type) {
    case YOUR_TYPE:
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
