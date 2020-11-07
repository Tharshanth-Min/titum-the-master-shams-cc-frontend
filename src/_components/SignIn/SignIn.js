import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SignIn.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthService from '../../_services';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {green} from "@material-ui/core/colors";
import {Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://titum.lk">
                Titum Pvt Ltd
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'} <p>info@titum.lk | +94 77 209 7766 </p>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
        marginLeft: theme.spacing(22)
    },
    buttonProgress: {
        color: green[900],
        position: 'absolute',
        top: '54%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    margin: {
        marginTop: theme.spacing(2),
    },

}));

function SignIn(props) {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState({
        error: false,
        message: '',
    });
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setPassword(event.target.value)
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clearHook = () => {
        setUserName('');
        setPassword('');
    };


    const handleClickSave= async (event) => {
        event.preventDefault();
        setLoading(true);

        const { dispatch } = props;
        const credentials ={
            userName : userName,
            password : password,
        };
        console.log(credentials);

        dispatch(AuthService.login(credentials)).catch((err) => {
            const errors = Object.values(err.errors);
            errors.join(' ');
            const response = {
                error: true,
                message: errors,
            };
            setResponse(response);
            setLoading(false);
        });
    };


    const classes = useStyles();

    // If user is already authenticated we redirect to entry location.
    const { location: state } = props;
    const { from } = state || { from: { pathname: '/' } };
    const { isAuthenticated } = props;

    if (isAuthenticated) {
        return <Redirect to={from} />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    The Master Shames CC
                </Typography>
                {response.error && (
                    <Alert severity="error">{response.message}</Alert>
                )}
                <form
                    onSubmit={handleClickSave}
                    className={classes.form}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        required
                        autoComplete="userName"
                        autoFocus
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />

                    <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

SignIn.defaultProps = {
    location: {
        state: {
            pathname: '/',
        },
    },
};

SignIn.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
        state: {
            pathname: PropTypes.string,
        },
    }),
};


const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(SignIn);





