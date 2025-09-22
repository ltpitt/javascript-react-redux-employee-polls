import {
  setAuthedUser,
  logoutAuthedUser,
  handleLogin,
  handleLogout,
  SET_AUTHED_USER,
  LOGOUT_AUTHED_USER
} from './authedUser';

describe('authedUser actions', () => {
  describe('setAuthedUser', () => {
    it('should create an action to set the authenticated user', () => {
      const userId = 'sarahedo';
      const expectedAction = {
        type: SET_AUTHED_USER,
        id: userId
      };
      expect(setAuthedUser(userId)).toEqual(expectedAction);
    });
  });

  describe('logoutAuthedUser', () => {
    it('should create an action to logout the authenticated user', () => {
      const expectedAction = {
        type: LOGOUT_AUTHED_USER
      };
      expect(logoutAuthedUser()).toEqual(expectedAction);
    });
  });

  describe('handleLogin', () => {
    it('should dispatch setAuthedUser when credentials are valid', () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => ({
        users: {
          sarahedo: {
            id: 'sarahedo',
            password: 'password123',
            name: 'Sarah Edo'
          }
        }
      }));

      const thunk = handleLogin('sarahedo', 'password123');
      thunk(mockDispatch, mockGetState);

      expect(mockDispatch).toHaveBeenCalledWith(setAuthedUser('sarahedo'));
    });

    it('should not dispatch when credentials are invalid', () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => ({
        users: {
          sarahedo: {
            id: 'sarahedo',
            password: 'password123',
            name: 'Sarah Edo'
          }
        }
      }));

      const thunk = handleLogin('sarahedo', 'wrongpassword');
      thunk(mockDispatch, mockGetState);

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch when user does not exist', () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn(() => ({
        users: {}
      }));

      const thunk = handleLogin('nonexistent', 'password');
      thunk(mockDispatch, mockGetState);

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe('handleLogout', () => {
    it('should dispatch logoutAuthedUser', () => {
      const mockDispatch = jest.fn();

      const thunk = handleLogout();
      thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(logoutAuthedUser());
    });
  });
});