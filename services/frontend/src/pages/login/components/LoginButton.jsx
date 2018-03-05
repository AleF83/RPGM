import React from 'react';
import SocialLoginButtonProvider from 'react-social-login-buttons/lib/buttons/SocialLoginButtonProvider';
import PropTypes from 'prop-types';

import getProviderStyle from '../authProviderStyles';

const LoginButton = ({ id, onClick }) => (
  <SocialLoginButtonProvider
    defaults={getProviderStyle(id)}
    props={{ onClick }}
  />
);

LoginButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LoginButton;
