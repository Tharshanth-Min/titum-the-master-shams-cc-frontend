import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AdminNavigation from '../_components/SideNavigation/AdminNavigation';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const [isExpand, setIsExpand] = useState(false);

    const update = (value) => {
        setIsExpand(value);
    };

    return (
        <Route
            {...rest}
            render={(props) => ( isAuthenticated  ? (
                <>
                    <AdminNavigation data={update.bind(this)} />
                    <Component {...props} IsExpand={isExpand} />
                </>
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            ))
            }/>
    )
};


AdminRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AdminRoute);
