import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SideNavigation from '../_components/SideNavigation/SideNavigation';
import { connect } from 'react-redux';

const SplitRoute = ({component: Component, fallback: Fallback,   isAuthenticated, ...rest}) => {
    const [isExpand, setIsExpand] = useState(false);

    const update = (value) => {
        setIsExpand(value);
    };

    return (<Route
            {...rest}
            render={(props) => (isAuthenticated ? (
                <div>
                    <SideNavigation data={update.bind(this)}/>
                    <Component {...props} IsExpand={isExpand}/>
                </div>
            ) : (
                <div>
                    <Fallback {...props} />
                </div>
            ))}
        />
    )
};

SplitRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(SplitRoute);