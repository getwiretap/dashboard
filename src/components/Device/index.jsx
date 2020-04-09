import React from 'react';
import PropTypes from 'prop-types';
import BarLoader from 'react-spinners/BarLoader';
import { Card, Icon } from 'evergreen-ui';

import { getSessionColor, getSessionStatus } from 'utils/sessions';


const propTypes = {
  session: PropTypes.shape({
    deviceId: PropTypes.string,
    deviceName: PropTypes.string,
    password: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  session: null,
};

const Device = ({ session }) => {
  const status = getSessionStatus(session);
  const backgroundColor = getSessionColor(session);

  const icons = {
    connected: 'lock',
    online: 'cell-tower',
    offline: 'power',
  };

  const icon = icons[status];

  return (
    <Card
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={116}
      width={84}
      borderRadius={8}
      background="#232323"
      elevation={2}
    >
      <Card
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={96}
        width={72}
        background={backgroundColor}
        borderRadius={2}
      >
        {
          status === 'online' ? (
            <BarLoader
              color="white"
              height={2}
              width={20}
            />
          ) : (
            <Icon
              icon={icon}
              color="white"
            />
          )
        }
      </Card>
    </Card>
  );
};

Device.propTypes = propTypes;
Device.defaultProps = defaultProps;

export default Device;
