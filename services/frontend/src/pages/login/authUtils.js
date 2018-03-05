/* global localStorage window */
import Oidc from 'oidc-client';

export const a = 1;

export const createAuthClient = ({ id, authority, clientId }) => {
  const oidcSettings = {
    authority,
    client_id: clientId,
    redirect_uri: `${window.location.origin}/auth/${id}/`,
    silent_redirect_uri: `${window.location.origin}/auth/${id}/`,
    post_logout_redirect_uri: `${window.location.origin}/login`,
    response_type: 'id_token token',
    filterProtocolClaims: true,
    loadUserInfo: true,
  };
  return {
    id,
    oidcSettings,
  };
};

export const signinRedirect = (oidcSettings) => {
  localStorage.setItem('oidcSettings', JSON.stringify(oidcSettings));
  const oidcClient = new Oidc.UserManager(oidcSettings);
  return oidcClient.signinRedirect();
};

export const handleSigninRedirectCallback = async () => {
  const oidcSettings = JSON.parse(localStorage.getItem('oidcSettings'));
  const oidcClient = new Oidc.UserManager(oidcSettings);
  const user = await oidcClient.signinRedirectCallback();
  console.log('USER', user);
};
