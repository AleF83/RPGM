import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({
  component: Component, isAuthenticated, path, ...rest
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
              state: { from: path },
            }}
          />
        ))
      }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.idToken,
});

const enhance = connect(mapStateToProps);

export default enhance(PrivateRoute);
