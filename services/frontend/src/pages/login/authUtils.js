import Oidc from 'oidc-client';

export const a = 1;

export const createAuthClient = ({ id, authority, clientId }) => {
  const settings = {
    authority,
    client_id: clientId,
    redirect_uri: 'http://localhost:3000',
    post_logout_redirect_uri: 'http://localhost:3000/login',
    response_type: 'id_token token',

    filterProtocolClaims: true,
    loadUserInfo: true,
  };
  const oidcClient = new Oidc.OidcClient(settings);
  return {
    id,
    oidcClient,
  };
};
