import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';


const PrivateRoute = ({
  component: Component, isAuthenticated, isAuthEnabled, location, ...rest
}) => (
  <Route
    {...rest}
    render={props =>
        ((isAuthenticated || !isAuthEnabled)
        ?
        (<Component {...props} />)
        :
        (<Redirect
          to={{
              pathname: '/login',
              state: { origin: location },
            }}
        />))
      }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
  isAuthenticated: PropTypes.bool.isRequired,
  isAuthEnabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.idToken,
});

const enhance = compose(
  connect(mapStateToProps),
  withProps(() => ({
    isAuthEnabled: process.env.REACT_APP_AUTH_ENABLED === 'true',
  })),
);

export default enhance(PrivateRoute);
