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
  const activePasswords = {};

  const devices = range(deviceAllowance).map(() => ({
    documentId: uuid(),
    status: 'offline',
  }));

  forEach(sessions, (session, documentId) => {
    const device = {
      ...session,
      documentId,
      status: 'connected',
    };

    activePasswords[session.password] = true;

    devices.shift();
    devices.push(device);
  });

  forEach(sessionPasswords, (sessionPassword, documentId) => {
    const isSessionActive = activePasswords[sessionPassword.password];

    if (!isSessionActive) {
      const device = {
        ...sessionPassword,
        documentId,
        status: 'online',
      };

      devices.shift();
      devices.push(device);
    }
  });

  const orderedDevices = orderBy(devices, 'createdAt');

  return (
    <Pane>
      {
        orderedDevices.map(({
          deviceName,
          documentId,
          password,
          status,
        }) => (
          <DeviceCard
            deviceName={deviceName}
            documentId={documentId}
            key={documentId}
            password={password}
            status={status}
          />
        ))
      }
    </Pane>
  );
};

export default Sessions;
