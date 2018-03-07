/* global localStorage */
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import AppRouterElement from './AppRouterElement';
import { authTokenReceived, authEnabled } from '../pages/login/state/authActionCreators';

const mapDispatchToProps = dispatch => ({
  authTokenReceived: idToken => dispatch(authTokenReceived(idToken)),
  authEnabled: isEnabled => dispatch(authEnabled(isEnabled)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const idToken = localStorage.getItem('idToken');
      if (idToken) {
        this.props.authTokenReceived(idToken);
      }

      const isAuthEnabled = Boolean(process.env.REACT_APP_AUTH_ENABLED) || false;
      this.props.authEnabled(isAuthEnabled);
    },
  }),
);

export default enhance(AppRouterElement);
