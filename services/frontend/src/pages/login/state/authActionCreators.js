import {
  AUTH_PROVIDERS_REQUEST,
  AUTH_PROVIDERS_SUCCESS,
  AUTH_PROVIDERS_FAILURE,
  AUTH_DISCOVER_REQUEST,
  AUTH_DISCOVER_SUCCESS,
  AUTH_DISCOVER_FAILURE,
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

export const authDiscoverRequest = (providerId, oidcClient) => ({
  type: AUTH_DISCOVER_REQUEST,
  providerId,
  oidcClient,
});

export const authDiscoverSuccess = (providerId, payload) => ({
  type: AUTH_DISCOVER_SUCCESS,
  providerId,
  payload,
});

export const authDiscoverFailure = (providerId, message) => ({
  type: AUTH_DISCOVER_FAILURE,
  providerId,
  message,
});
