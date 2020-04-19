import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Pane, Paragraph } from 'evergreen-ui';


const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

const PageTitle = ({ title, subtitle }) => (
  <Pane
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    height={40}
    marginBottom={40}
  >
    <Heading size={800}>
      { title }
    </Heading>
    <Paragraph>
      { subtitle }
    </Paragraph>
  </Pane>
);

PageTitle.propTypes = propTypes;

export default PageTitle;
