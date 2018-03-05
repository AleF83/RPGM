import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { compose, lifecycle } from 'recompose';

import { handleSigninRedirectCallback } from './authUtils';

const mapDispatchToProps = dispatch => ({
  redirect: url => dispatch(replace(url)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      handleSigninRedirectCallback().then(() => this.props.redirect('/entity'));
    },
  }),
);

export default enhance(() => null);
