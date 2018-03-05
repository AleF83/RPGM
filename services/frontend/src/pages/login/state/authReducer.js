import {
  AUTH_PROVIDERS_REQUEST,
  AUTH_PROVIDERS_SUCCESS,
  AUTH_PROVIDERS_FAILURE,
} from './authActionTypes';

const arrayToObject = (arr, keyProp = 'id') =>
  arr.reduce((acc, cur) => ({ ...acc, [cur[keyProp]]: cur }), {});

export const initialState = {
  authProviders: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_PROVIDERS_REQUEST:
      return state;
    case AUTH_PROVIDERS_SUCCESS:
      return {
        ...state,
        authProviders: arrayToObject(action.authProviders),
      };
    case AUTH_PROVIDERS_FAILURE:
      return state;

    default:
      return state;
  }
};
