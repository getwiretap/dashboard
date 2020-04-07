import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Pane } from 'evergreen-ui';


const propTypes = {
  text: PropTypes.string.isRequired,
};

const PageTitle = ({ text }) => (
  <Pane
    display="flex"
    alignItems="center"
    height={40}
    marginBottom={20}
  >
    <Heading size={900}>
      { text }
    </Heading>
  </Pane>
);

PageTitle.propTypes = propTypes;

export default PageTitle;
