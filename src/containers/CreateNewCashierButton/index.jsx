import React from 'react';
import { Pane } from 'evergreen-ui';

import ButtonLink from 'components/ButtonLink';
import { CASHIER_NEW } from 'routes';


const CreateNewCashierButton = () => (
  <Pane
    display="flex"
    justifyContent="flex-start"
  >
    <ButtonLink
      to={CASHIER_NEW}
      iconName="plus"
      text="Create new cashier"
    />
  </Pane>
);

export default CreateNewCashierButton;
