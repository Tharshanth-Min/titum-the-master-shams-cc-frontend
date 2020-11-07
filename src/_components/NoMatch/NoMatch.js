import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "50%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header : {
        color: '#2196f3'
    }
}));

function NoMatch () {
    const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <div>
                    <Typography className={classes.header} component="h1" variant="h5">
                        404 | No page found.
                    </Typography>
                </div>

            </div>
        </Container>
    );
}

export default NoMatch;
