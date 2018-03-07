import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from './components/LoginButton';
import { signinRedirect } from './authUtils';

const LoginPageElement = ({ authProviders, location: { state } }) => (
  <div>
    This is Login Page
    {
      Object.keys(authProviders).map(key =>
        (<LoginButton
          key={key}
          id={key}
          onClick={() =>
            signinRedirect(
              key,
              authProviders[key].issuer,
              authProviders[key].clientId,
              { state },
            )}
        />))
    }
  </div>
);

LoginPageElement.propTypes = {
  authProviders: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default LoginPageElement;
