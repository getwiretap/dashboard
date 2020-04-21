import React, { useContext } from 'react';
import orderBy from 'lodash.orderby';
import { Pane } from 'evergreen-ui';

import CashierCard from 'containers/CashierCard';
import { StateContext as CashiersContext } from 'state/Cashiers';


const Cashiers = () => {
  const cashiers = useContext(CashiersContext);

  const orderedCashiers = orderBy(cashiers, 'displayName');

  return (
    <Pane>
      {
        orderedCashiers.map(({
          displayName,
          password,
        }) => (
          <CashierCard
            key={password}
            displayName={displayName}
            password={password}
          />
        ))
      }
    </Pane>
  );
};

export default Cashiers;
