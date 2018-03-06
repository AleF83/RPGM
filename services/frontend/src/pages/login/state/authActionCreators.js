import {
  AUTH_PROVIDERS_REQUEST,
  AUTH_PROVIDERS_SUCCESS,
  AUTH_PROVIDERS_FAILURE,
  AUTH_TOKEN_RECEIVED,
} from './authActionTypes';

export const authProvidersRequest = () => ({
  type: AUTH_PROVIDERS_REQUEST,
});

export const authProvidersSuccess = authProviders => ({
  type: AUTH_PROVIDERS_SUCCESS,
  authProviders,
});

export const authProvidersFailure = message => ({
  type: AUTH_PROVIDERS_FAILURE,
  message,
});

export const authTokenReceived = idToken => ({
  type: AUTH_TOKEN_RECEIVED,
  idToken,
});
