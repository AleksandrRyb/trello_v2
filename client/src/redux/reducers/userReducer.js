import * as ACTIONS from "../consts/userConsts";

const initialState = {
  token: undefined,
  user: {
    id: undefined,
    username: undefined,
  },
  registerRequest: true,
  registerSuccess: false,
  loginRequest: true,
  loginSuccess: false,
  isValid: false,
  userRequest: true,
  tokenRequest: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.REGISTER_REQUEST:
      return { ...state, registerRequest: true, registerSuccess: false };
    case ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        registerRequest: false,
        user: action.payload.user,
      };
    case ACTIONS.REGISTER_FAILED:
      return {
        ...state,
        registerSuccess: false,
        registerRequest: false,
        registerError: action.payload.error,
      };
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loginRequest: true,
        loginSuccess: false,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,
        user: action.payload.user,
        token: action.payload.token,
        isValid: true,
      };
    case ACTIONS.LOGIN_FAILED:
      return {
        ...state,
        loginSuccess: false,
        loginRequest: false,
        loginError: action.payload.error,
      };
    case ACTIONS.TOKEN_REQUEST:
      return {
        ...state,
        tokenRequest: true,
      };
    case ACTIONS.TOKEN_SUCCESS:
      return {
        ...state,
        isValid: action.payload.isTokenValid,
        token: action.payload.token,
        tokenRequest: false,
      };
    case ACTIONS.TOKEN_FAILED:
      return {
        ...state,
        tokenError: action.payload.error,
      };
    case ACTIONS.USER_REQUEST:
      return {
        ...state,
        userRequest: true,
      };
    case ACTIONS.USER_SUCCESS:
      return {
        ...state,
        userRequest: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
