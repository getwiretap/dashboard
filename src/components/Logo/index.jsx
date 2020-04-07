import React from 'react';
import PropTypes from 'prop-types';

import logo from 'assets/logo.svg';


const propTypes = {
  width: PropTypes.number.isRequired,
};

const Logo = ({ width }) => (
  <img
    alt="logo"
    src={logo}
    width={width}
  />
);

Logo.propTypes = propTypes;

export default Logo;
