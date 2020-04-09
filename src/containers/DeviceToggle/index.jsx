import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pane, Button, Text } from 'evergreen-ui';

import { DispatchContext as SessionsDispatchContext } from 'state/Sessions';


const propTypes = {
  session: PropTypes.shape({
    deviceId: PropTypes.string,
    deviceName: PropTypes.string,
    id: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  session: null,
};

const DeviceToggle = ({ session }) => {
  const { createSession, killSession } = useContext(SessionsDispatchContext);

  const handleClick = () => {
    if (session) {
      killSession(session);
      return;
    }

    createSession();
  };

  return (
    <Pane
      flexGrow={1}
      flexShrink={0}
      display="flex"
      alignItems="flex-end"
    >
      <Button
        appearance="primary"
        margin={2}
        onClick={handleClick}
      >
        <Text color="white">
          Toggle session status
        </Text>
      </Button>
    </Pane>
  );
};

DeviceToggle.propTypes = propTypes;
DeviceToggle.defaultProps = defaultProps;

export default DeviceToggle;
