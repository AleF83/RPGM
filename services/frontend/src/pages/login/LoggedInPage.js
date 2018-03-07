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
      handleSigninRedirectCallback().then(({ id_token: idToken, state: { origin } }) => {
        this.props.authTokenReceived(idToken);
        this.props.redirect(`${origin.pathname}${origin.hash || origin.search}`);
      });
    },
  }),
);

export default enhance(() => null);
