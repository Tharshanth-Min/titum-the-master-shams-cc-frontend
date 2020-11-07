import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import UserNavigation from '../_components/SideNavigation/UserNavigation';

const UserRoute = ({ component: Component, ...rest }) => {
    const [isExpand, setIsExpand] = useState(false);

    const update = (value) => {
        setIsExpand(value);
    };

    return (
        <Route
            {...rest}
            render={(props) => (localStorage.getItem('isAuthenticated') && localStorage.getItem('userType') === "user"  ? (
                <>
                    <UserNavigation data={update.bind(this)} />
                    <Component {...props} IsExpand={isExpand} />
                </>
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location },
                    }}
                />
            ))
            } />
    )
};

UserRoute.propTypes = {
    //isAuthenticated: PropTypes.bool.isRequired,
};

UserRoute.defaultProps = {};

export default UserRoute;
