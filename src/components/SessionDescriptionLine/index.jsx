import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Pane, Code } from 'evergreen-ui';

import { scales } from 'theme/colors';


const propTypes = {
  iconColor: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  iconColor: scales.N6,
};

const SessionDescriptionLine = ({ icon, iconColor, text }) => (
  <Pane
    display="flex"
    alignItems="center"
  >
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      width={22}
    >
      <Icon
        icon={icon}
        color={iconColor}
        paddingBottom={1}
      />
    </Pane>
    <Code
      boxShadow="none"
      background="none"
      padding={0}
    >
      { text }
    </Code>
  </Pane>
);

SessionDescriptionLine.propTypes = propTypes;
SessionDescriptionLine.defaultProps = defaultProps;

export default SessionDescriptionLine;
