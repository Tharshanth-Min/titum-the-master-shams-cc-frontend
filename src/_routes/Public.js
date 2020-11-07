import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../_components/Header/Header';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
        <Component {...props} />
    )}
  />
);

PublicRoute.propTypes = {};

export default PublicRoute;
