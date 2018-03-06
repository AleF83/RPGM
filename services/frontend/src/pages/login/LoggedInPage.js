import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { compose, lifecycle } from 'recompose';

import { authTokenReceived } from './state/authActionCreators';
import { handleSigninRedirectCallback } from './authUtils';

const mapDispatchToProps = dispatch => ({
  redirect: url => dispatch(replace(url)),
  authTokenReceived: idToken => dispatch(authTokenReceived(idToken)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      handleSigninRedirectCallback().then((idToken) => {
        this.props.authTokenReceived(idToken);
        this.props.redirect('/entity');
      });
    },
  }),
);

export default enhance(() => null);
