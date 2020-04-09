import React from 'react';
import { Pane } from 'evergreen-ui';

import Devices from 'containers/Devices';
import PageTitle from 'components/PageTitle';


const DevicesPage = () => (
  <Pane>
    <PageTitle text="Devices" />
    <Devices />
  </Pane>
);

export default DevicesPage;
