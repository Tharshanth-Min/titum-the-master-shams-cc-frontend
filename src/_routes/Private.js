import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import SideNavigation from '../_components/SideNavigation/SideNavigation';
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const [isExpand, setIsExpand] = useState(false);

    const update = (value) => {
        setIsExpand(value);
    };

    return (
        <Route
            {...rest}
            render={(props) => (isAuthenticated ? (
                <div>
                    <SideNavigation data={update.bind(this)} />
                    <Component {...props} IsExpand={isExpand} />
                </div>
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            ))
            } />
    )
};


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);