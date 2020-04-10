import React, { useContext } from 'react';
import get from 'lodash.get';
import { Pane } from 'evergreen-ui';

import DeviceCard from 'components/DeviceCard';
import { StateContext as UserContext } from 'state/User';
import { StateContext as ConnectionRequestsContext } from 'state/ConnectionRequests';
import { StateContext as SessionsContext } from 'state/Sessions';


const Sessions = () => {
  const { user } = useContext(UserContext);
  const connectionRequests = useContext(ConnectionRequestsContext);
  const sessions = useContext(SessionsContext);

  const deviceCount = get(user, 'plan.devices', 0);
  const devices = [...Array(deviceCount).keys()].map(() => null);

  console.log('cR:', connectionRequests);
  console.log('s:', sessions);

  return (
    <Pane>
      {
        devices.map((device, index) => (
          <DeviceCard
            key={index}
            device={device}
          />
        ))
      }
    </Pane>
  );
};

export default Sessions;
