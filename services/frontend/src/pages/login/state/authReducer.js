import {
  AUTH_PROVIDERS_REQUEST,
  AUTH_PROVIDERS_SUCCESS,
  AUTH_PROVIDERS_FAILURE,
  AUTH_TOKEN_RECEIVED,
} from './authActionTypes';

export const initialState = {
  authProviders: {},
  idToken: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_PROVIDERS_REQUEST:
      return state;
    case AUTH_PROVIDERS_SUCCESS:
      return {
        ...state,
        authProviders: action.authProviders,
      };
    case AUTH_PROVIDERS_FAILURE:
      return state;

    case AUTH_TOKEN_RECEIVED:
      return {
        ...state,
        idToken: action.idToken,
      };

    default:
      return state;
  }
};
