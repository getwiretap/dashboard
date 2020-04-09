import React from 'react';
import PropTypes from 'prop-types';
import { defaultTheme, Spinner, ThemeProvider } from 'evergreen-ui';


const propTypes = {
  color: PropTypes.string.isRequired,
};

const ColoredSpinner = ({ color, ...props }) => {
  const localTheme = {
    ...defaultTheme,
    spinnerColor: color,
  };

  /* eslint-disable */

  return (
    <ThemeProvider value={localTheme}>
      <Spinner {...props} />
    </ThemeProvider>
  );

  /* eslint-enable */
};

ColoredSpinner.propTypes = propTypes;

export default ColoredSpinner;
