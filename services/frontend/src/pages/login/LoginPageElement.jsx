import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from './LoginButton';

const LoginPageElement = ({ authProviders }) => (
  <div>
    This is Login Page
    {
      Object.values(authProviders).map(ap =>
        (<LoginButton
          key={ap.id}
          provider={ap}
          url={ap.url}
        />))
    }
  </div>
);

LoginPageElement.propTypes = {
  authProviders: PropTypes.object.isRequired, // eslint-disable-line
};

export default LoginPageElement;
