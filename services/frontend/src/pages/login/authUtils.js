/* global localStorage window */
import Oidc from 'oidc-client';

const createOidcClientConfiguration = (id, authority, clientId, scope) => ({
  authority,
  client_id: clientId,
  redirect_uri: `${window.location.origin}/auth/${id}/`,
  silent_redirect_uri: `${window.location.origin}/auth/${id}/`,
  post_logout_redirect_uri: `${window.location.origin}/login`,
  response_type: 'id_token token',
  scope,
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true,
  userStore: new Oidc.WebStorageStateStore({ store: localStorage }),
});

export const signinRedirect = (id, issuer, clientId, scope, state = {}) => {
  const oidcSettings = createOidcClientConfiguration(id, issuer, clientId, scope);
  const oidcClient = new Oidc.UserManager(oidcSettings);
  return oidcClient.signinRedirect(state);
};

export const handleSigninRedirectCallback = async () => {
  const oidcClient = new Oidc.UserManager();
  const user = await oidcClient.signinRedirectCallback();
  localStorage.setItem('id_token', user.id_token);
  return user;
};
