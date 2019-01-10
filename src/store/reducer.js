import initialState from './initialState';
import * as Actions from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_SIGNUP:
      return {
        ...state,
        signups: [
          ...state.signups,
          action.payload.signup
        ]
      };

    case Actions.APPROVE_SIGNUP:
      return {
        ...state,
        signups: state.signups.map(signup => signup.id === action.payload.id ? {
          ...signup,
          status: 'Approved'
        } : signup)
      };

    case Actions.DECLINE_SIGNUP:
      return {
        ...state,
        signups: state.signups.map(signup => signup.id === action.payload.id ? {
          ...signup,
          status: 'Declined'
        } : signup)
      };

    default:
      return state;
  }
};