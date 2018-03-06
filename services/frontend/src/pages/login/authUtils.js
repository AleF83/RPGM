/* global localStorage window */
import Oidc from 'oidc-client';

const createOidcClientConfiguration = (id, authority, clientId) => ({
  authority,
  client_id: clientId,
  redirect_uri: `${window.location.origin}/auth/${id}/`,
  silent_redirect_uri: `${window.location.origin}/auth/${id}/`,
  post_logout_redirect_uri: `${window.location.origin}/login`,
  response_type: 'id_token token',
  scope: 'openid email profile',
  filterProtocolClaims: true,
  loadUserInfo: true,
});

export const signinRedirect = (id, authority, clientId) => {
  const oidcSettings = createOidcClientConfiguration(id, authority, clientId);
  localStorage.setItem('oidcSettings', JSON.stringify(oidcSettings));
  const oidcClient = new Oidc.UserManager(oidcSettings);
  return oidcClient.signinRedirect();
};

export const handleSigninRedirectCallback = async () => {
  const oidcSettings = JSON.parse(localStorage.getItem('oidcSettings'));
  const oidcClient = new Oidc.UserManager(oidcSettings);
  const user = await oidcClient.signinRedirectCallback();
  localStorage.setItem('id_token', user.id_token);
  return user.id_token;
};
