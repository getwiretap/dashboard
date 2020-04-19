import React from 'react';
import { Pane } from 'evergreen-ui';

import Devices from 'containers/Devices';
import PageTitle from 'components/PageTitle';


const DevicesPage = () => (
  <Pane>
    <PageTitle
      title="Devices"
      subtitle="You can manage your connected devices here."
    />
    <Devices />
  </Pane>
);

export default DevicesPage;
