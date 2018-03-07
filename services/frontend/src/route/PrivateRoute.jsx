import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({
  component: Component, isAuthenticated, location, ...rest
}) => (
  <Route
    {...rest}
    render={props =>
        (isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { origin: location },
            }}
          />
        ))
      }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.idToken,
});

const enhance = connect(mapStateToProps);

export default enhance(PrivateRoute);
