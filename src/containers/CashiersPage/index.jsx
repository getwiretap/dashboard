import React from 'react';
import { Pane } from 'evergreen-ui';

import CashierDetailsDialog from 'containers/CashierDetailsDialog';
import Cashiers from 'containers/Cashiers';
import CreateNewCashierButton from 'containers/CreateNewCashierButton';
import PageTitle from 'components/PageTitle';


const CashiersPage = () => (
  <Pane>
    <PageTitle
      title="Cashiers"
      subtitle="You can manage your cashiers here."
    />
    <Cashiers />
    <CreateNewCashierButton />
    <CashierDetailsDialog />
  </Pane>
);

export default CashiersPage;
