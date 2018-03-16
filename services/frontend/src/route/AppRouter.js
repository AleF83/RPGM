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
      const idToken = localStorage.getItem('id_token');
      if (idToken) {
        this.props.authTokenReceived(idToken);
      }
    },
  }),
);

export default enhance(AppRouterElement);
