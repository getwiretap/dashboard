import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Card } from 'evergreen-ui';

import Device from 'components/Device';
import DeviceToggle from 'containers/DeviceToggle';
import SessionDescription from 'containers/SessionDescription';


const propTypes = {
  deviceName: PropTypes.string,
  id: PropTypes.string,
  password: PropTypes.string,
  status: PropTypes.oneOf(['online', 'offline', 'connected']).isRequired,
};

const defaultProps = {
  deviceName: null,
  id: null,
  password: null,
};

const DeviceCard = ({
  deviceName,
  password,
  status,
  id,
}) => (
  <Card
    display="flex"
    width={460}
    padding={40}
    marginBottom={20}
    background="white"
    elevation={2}
  >
    <Pane marginRight={30}>
      <Device status={status} />
    </Pane>
    <Pane
      display="flex"
      flexDirection="column"
      paddingY={5}
    >
      <SessionDescription
        deviceName={deviceName}
        password={password}
        status={status}
      />
      <DeviceToggle
        id={id}
        status={status}
      />
    </Pane>
  </Card>
);

DeviceCard.propTypes = propTypes;
DeviceCard.defaultProps = defaultProps;

export default DeviceCard;
