import {
  AUTH_PROVIDERS_REQUEST,
  AUTH_PROVIDERS_SUCCESS,
  AUTH_PROVIDERS_FAILURE,
  AUTH_DISCOVER_REQUEST,
  AUTH_DISCOVER_SUCCESS,
  AUTH_DISCOVER_FAILURE,
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

    case AUTH_DISCOVER_REQUEST:
      return state;

    case AUTH_DISCOVER_SUCCESS:
      return {
        ...state,
        authProviders: {
          ...state.authProviders,
          [action.providerId]: {
            ...state.authProviders[action.providerId],
            url: action.payload.url,
          },
        },
      };

    case AUTH_DISCOVER_FAILURE:
      return state;

    default:
      return state;
  }
};
