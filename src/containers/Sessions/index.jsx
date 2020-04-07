import React, { useContext } from 'react';

import Device from 'components/Device';
import { StateContext as UserContext } from 'state/User';
import { StateContext as SessionsContext } from 'state/Sessions';


const Sessions = () => {
  const { plan: { devices } } = useContext(UserContext);
  const sessions = useContext(SessionsContext);

  console.log('SESSIONS', sessions);

  const userDevices = [...Array(devices).keys()];

  return (
    <div>
      {
      userDevices
        .map((index) => (
          <Device key={index} />
        ))
      }
    </div>
  );
};

export default Sessions;
