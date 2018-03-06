import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from './components/LoginButton';
import { signinRedirect } from './authUtils';

const LoginPageElement = ({ authProviders }) => (
  <div>
    This is Login Page
    {
      Object.keys(authProviders).map(key =>
        (<LoginButton
          key={key}
          id={key}
          onClick={() =>
            signinRedirect(key, authProviders[key].authority, authProviders[key].clientId)}
        />))
    }
  </div>
);

LoginPageElement.propTypes = {
  authProviders: PropTypes.object.isRequired, // eslint-disable-line
};

export default LoginPageElement;
