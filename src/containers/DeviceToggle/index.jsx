import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pane, Button, Text } from 'evergreen-ui';

import { DispatchContext as SessionsDispatchContext } from 'state/Sessions';
import { DispatchContext as SessionPasswordsDispatchConenxt } from 'state/SessionPasswords';


const propTypes = {
  documentId: PropTypes.string,
  status: PropTypes.oneOf(['online', 'offline', 'connected']).isRequired,
};

const defaultProps = {
  documentId: '',
};


const DeviceToggle = ({ documentId, status }) => {
  const { killSession } = useContext(SessionsDispatchContext);
  const {
    createSessionPassword,
    deleteSessionPassword,
  } = useContext(SessionPasswordsDispatchConenxt);

  const handleClick = () => {
    if (status === 'offline') {
      createSessionPassword();
      return;
    }

    if (status === 'online') {
      deleteSessionPassword(documentId);
      return;
    }

    killSession(documentId);
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
