import React, { useContext } from 'react';
import forEach from 'lodash.foreach';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import range from 'lodash.range';
import { v4 as uuid } from 'uuid';
import { Pane } from 'evergreen-ui';

import DeviceCard from 'components/DeviceCard';
import { StateContext as UserContext } from 'state/User';
import { StateContext as SessionPasswordsContext } from 'state/SessionPasswords';
import { StateContext as SessionsContext } from 'state/Sessions';


const Sessions = () => {
  const { user } = useContext(UserContext);
  const sessionPasswords = useContext(SessionPasswordsContext);
  const sessions = useContext(SessionsContext);

  const deviceAllowance = get(user, 'plan.devices', 0);

  const devices = range(deviceAllowance).map(() => ({
    id: uuid(),
    status: 'offline',
  }));

  forEach(sessions, (session, deviceId) => {
    const device = {
      ...session,
      id: deviceId,
      status: 'connected',
    };

    devices.shift();
    devices.push(device);
  });

  forEach(sessionPasswords, (sessionPassword, password) => {
    const device = {
      ...sessionPassword,
      id: password,
      status: 'online',
    };

    devices.shift();
    devices.push(device);
  });

  const orderedDevices = orderBy(devices, 'createdAt');

  return (
    <Pane>
      {
        orderedDevices.map(({
          deviceName,
          id,
          password,
          status,
        }) => (
          <DeviceCard
            deviceName={deviceName}
            id={id}
            key={id}
            password={password}
            status={status}
          />
        ))
      }
    </Pane>
  );
};

export default Sessions;
