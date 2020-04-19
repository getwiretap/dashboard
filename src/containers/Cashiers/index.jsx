import React, { useContext } from 'react';
import orderBy from 'lodash.orderby';
import { Pane } from 'evergreen-ui';

import DeviceCard from 'components/DeviceCard';
import { StateContext as CashiersContext } from 'state/Cashiers';


const Sessions = () => {
  const cashiers = useContext(CashiersContext);

  const orderedCashiers = orderBy(cashiers, 'displayName');

  return (
    <Pane>
      {
        orderedCashiers.map(({
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
