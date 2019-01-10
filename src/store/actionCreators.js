import * as Actions from './actions';
import uuidv1 from 'uuid/v1';

export const approveSignup = (id) => ({
  type: Actions.APPROVE_SIGNUP,
  payload: {
    id
  }
});

export const declineSignup = (id) => ({
  type: Actions.DECLINE_SIGNUP,
  payload: {
    id
  }
});

export const addSignup = ({ firstName, lastName }) => ({
  type: Actions.ADD_SIGNUP,
  payload: {
    signup: {
      firstName,
      lastName,
      status: 'Pending',
      id: uuidv1()
    }
  }
});
