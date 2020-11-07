import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import ModeratorNavigation from "../_components/SideNavigation/ModeratorNavigation";

const ModeratorRoute = ({ component: Component, ...rest }) => {
    const [isExpand, setIsExpand] = useState(false);
    const update = (value) => {
        setIsExpand(value);
    };
    return (
        <Route
            {...rest}
            render={(props) => (localStorage.getItem('isAuthenticated') && localStorage.getItem('userType') === "moderator"  ? (
                <div>
                    <ModeratorNavigation data={update.bind(this)} />
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

ModeratorRoute.propTypes = {
    //isAuthenticated: PropTypes.bool.isRequired,
};

ModeratorRoute.defaultProps = {};

export default ModeratorRoute;
