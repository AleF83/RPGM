import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from './components/LoginButton';
import { signinRedirect } from './authUtils';

const LoginPageElement = ({ authProviders }) => (
  <div>
    This is Login Page
    {
      Object.values(authProviders).map(ap =>
        (<LoginButton
          key={ap.id}
          id={ap.id}
          onClick={() => signinRedirect(ap.oidcSettings)}
        />))
    }
  </div>
);

LoginPageElement.propTypes = {
  authProviders: PropTypes.object.isRequired, // eslint-disable-line
};

export default LoginPageElement;
