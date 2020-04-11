import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';

import SessionDescriptionLine from 'components/SessionDescriptionLine';
import { getStatusColor } from 'utils/sessions';


export const getStatusDescription = (status, deviceName) => {
  const statusDescriptions = {
    connected: `Connected to ${deviceName}`,
    online: 'Waiting for connection...',
    offline: 'Offline',
  };

  return statusDescriptions[status];
};


const propTypes = {
  deviceName: PropTypes.string,
  password: PropTypes.string,
  status: PropTypes.oneOf(['online', 'offline', 'connected']).isRequired,
};

const defaultProps = {
  deviceName: null,
  password: null,
};


const SessionDescription = ({ deviceName, password, status }) => {
  const statusDescription = getStatusDescription(status, deviceName);
  const indicatorColor = getStatusColor(status);

  const passwordText = `Access code: ${password}`;

  return (
    <Pane
      flexGrow={0}
      flexShrink={1}
      display="flex"
      flexDirection="column"
    >
      <SessionDescriptionLine
        icon="dot"
        iconColor={indicatorColor}
        text={statusDescription}
      />
      {
        password && (
          <SessionDescriptionLine
            icon="chevron-right"
            text={passwordText}
          />
        )
      }
    </Pane>
  );
};

SessionDescription.propTypes = propTypes;
SessionDescription.defaultProps = defaultProps;

export default SessionDescription;
