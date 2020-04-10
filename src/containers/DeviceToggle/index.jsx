import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pane, Button, Text } from 'evergreen-ui';

import { DispatchContext as CRDispatchContext } from 'state/ConnectionRequests';


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
  const { createConnectionRequest, killConnectionRequest } = useContext(CRDispatchContext);

  const handleClick = () => {
    if (session) {
      killConnectionRequest(session);
      return;
    }

    createConnectionRequest();
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
