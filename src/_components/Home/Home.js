import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';


import {USE_STYLES_FOR_MAIN_CONTENT } from "../../_constants/meterial-ui";



function Home(props) {
    const classes = USE_STYLES_FOR_MAIN_CONTENT();

    // If user is already authenticated we redirect to entry location.
    const { from } = props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = props;

    if (isAuthenticated) {
        return <Redirect to={from} />;
    }

    return (
        <div className={props.IsExpand ? classes.shiftTextRight : classes.shiftTextLeft}>
            <main className={classes.content}>

            </main>
        </div>
    );
}


Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);