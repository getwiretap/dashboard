import React, { useContext } from 'react';
import { Pane } from 'evergreen-ui';

import DeviceCard from 'components/DeviceCard';
import { StateContext as UserContext } from 'state/User';
import { StateContext as SessionsContext } from 'state/Sessions';
import { identity } from 'utils';


const Sessions = () => {
  const { plan } = useContext(UserContext);
  const sessions = useContext(SessionsContext);

  const deviceIndexes = [...Array(plan.devices).keys()];

  const sortedSessions = Object.keys(sessions)
    .map((sessionId) => sessions[sessionId])
    .filter(identity)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  return (
    <Pane>
      {
        deviceIndexes.map((index) => (
          <DeviceCard
            key={index}
            session={sortedSessions[index] || null}
          />
        ))
      }
    </Pane>
  );
};

export default Sessions;
