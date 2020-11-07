import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';
import LinearProgress from '@material-ui/core/LinearProgress';

const Loader = () => (
  <LinearProgress disableShrink color="secondary" />
);

Loader.propTypes = {};

Loader.defaultProps = {};

export default Loader;
