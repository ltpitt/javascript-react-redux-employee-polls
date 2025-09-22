import authedUserReducer from './authedUser';
import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../actions/authedUser';

describe('authedUser reducer', () => {
  it('should return the initial state', () => {
    expect(authedUserReducer(undefined, {})).toEqual(null);
  });

  it('should handle SET_AUTHED_USER', () => {
    const action = {
      type: SET_AUTHED_USER,
      id: 'sarahedo'
    };
    expect(authedUserReducer(null, action)).toEqual('sarahedo');
  });

  it('should handle SET_AUTHED_USER with existing state', () => {
    const action = {
      type: SET_AUTHED_USER,
      id: 'tylermcginnis'
    };
    expect(authedUserReducer('sarahedo', action)).toEqual('tylermcginnis');
  });

  it('should handle LOGOUT_AUTHED_USER', () => {
    const action = {
      type: LOGOUT_AUTHED_USER
    };
    expect(authedUserReducer('sarahedo', action)).toEqual(null);
  });

  it('should return current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION'
    };
    expect(authedUserReducer('sarahedo', action)).toEqual('sarahedo');
  });
});