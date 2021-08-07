import {
  AUTHENTICATED_USER_FETCHED_ERROR,
  AUTHENTICATED_USER_FETCHED_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  USER_ERROR_CREATED,
  USER_SUCCESSFULLY_CREATED,
} from './actions';

export default function (state, action) {
  switch (action.type) {
    case USER_SUCCESSFULLY_CREATED:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        messages: null,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case USER_ERROR_CREATED:
      return {
        ...state,
        messages: action.payload,
      };
    case AUTHENTICATED_USER_FETCHED_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case SIGN_IN_ERROR:
    case SIGN_OUT_ERROR:
      return {
        ...state,
        messages: action.payload,
      };
    case SIGN_IN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        messages: null,
      };
    case SIGN_OUT_SUCCESS:
    case AUTHENTICATED_USER_FETCHED_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
