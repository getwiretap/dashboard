import React from 'react';
import PropTypes from 'prop-types';
import BarLoader from 'react-spinners/BarLoader';
import { Card, Icon } from 'evergreen-ui';

import { getStatusColor } from 'utils/sessions';


export const getIcon = (status) => {
  const icons = {
    connected: 'lock',
    online: 'cell-tower',
    offline: 'power',
  };

  return icons[status];
};


const propTypes = {
  status: PropTypes.oneOf(['online', 'offline', 'connected']).isRequired,
};


const Device = ({ status }) => {
  const backgroundColor = getStatusColor(status);
  const icon = getIcon(status);

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

export default Device;
