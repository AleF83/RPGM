import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LoginPageElement from './LoginPageElement';
import { authProvidersRequest } from './state/authActionCreators';

const mapStateToProps = state => ({
  authProviders: state.auth.authProviders,
});

const mapDispatchToProps = dispatch => ({
  getAuthProviders: () => dispatch(authProvidersRequest()),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getAuthProviders();
    },
  }),
);

export default enhance(LoginPageElement);
