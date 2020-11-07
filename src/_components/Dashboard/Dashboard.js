import React from 'react';

import {USE_STYLES_FOR_MAIN_CONTENT } from "../../_constants/meterial-ui";



function Dashboard(props) {
    const classes = USE_STYLES_FOR_MAIN_CONTENT();

    return (
        <div className={props.IsExpand ? classes.shiftTextRight : classes.shiftTextLeft}>
            <main className={classes.content}>
              <h2>This is dashboard</h2>
            </main>
        </div>
    );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
