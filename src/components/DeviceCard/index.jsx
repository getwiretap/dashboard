import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Card } from 'evergreen-ui';

import Device from 'components/Device';
import DeviceToggle from 'containers/DeviceToggle';
import SessionDescription from 'containers/SessionDescription';


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

const DeviceCard = ({ session }) => (
  <Card
    display="flex"
    width={460}
    padding={40}
    marginBottom={20}
    background="white"
    elevation={2}
  >
    <Pane marginRight={30}>
      <Device session={session} />
    </Pane>
    <Pane
      display="flex"
      flexDirection="column"
      paddingY={5}
    >
      <SessionDescription session={session} />
      <DeviceToggle session={session} />
    </Pane>
  </Card>
);

DeviceCard.propTypes = propTypes;
DeviceCard.defaultProps = defaultProps;

export default DeviceCard;
