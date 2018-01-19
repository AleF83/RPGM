import React from 'react';
import SocialLoginButtonProvider from 'react-social-login-buttons/lib/buttons/SocialLoginButtonProvider';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { authDiscoverRequest } from './state/authActionCreators';

const socialLoginButtonStyles = {
  google: {
    text: 'Login with Google',
    icon: 'gplus',
    style: { background: '#cb3f22' },
    activeStyle: { background: '#a5331c' },
  },
  facebook: {
    text: 'Login with Facebook',
    icon: 'facebook',
    style: { background: '#3b5998' },
    activeStyle: { background: '#293e69' },
  },
};

const LoginButton = ({ provider, url }) => (
  <a href={url} disabled={!url}>
    <SocialLoginButtonProvider defaults={socialLoginButtonStyles[provider.id]} props={{}} />
  </a>

);

LoginButton.propTypes = {
  provider: PropTypes.object.isRequired, // eslint-disable-line
  url: PropTypes.string,
};

LoginButton.defaultProps = {
  url: '',
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  authDiscover: () =>
    dispatch(authDiscoverRequest(ownProps.provider.id, ownProps.provider.oidcClient)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.authDiscover();
    },
  }),
);

export default enhance(LoginButton);
