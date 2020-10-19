import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import {getPermission} from '../../../redux/usersRedux';

const Component = ({ component: Component, permmision, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      permmision !== 'notAuthorized' ? (
        <Component {...props} />
      ) : (
        <Redirect to='/NotFound' />
      )
    }
  />
);

Component.propTypes = {
  component: PropTypes.any,
  permmision: PropTypes.string,
};

const mapStateToProps = state => {
  const permmision = !getPermission(state) ? 'notAuthorized' : getPermission(state);
  return {
    permmision,
  };
};

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PrivateRoute,
  Container as PrivateRoute,
  Component as PrivateRouteComponent,
};
