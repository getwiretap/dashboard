import React from 'react';
import { Pane } from 'evergreen-ui';

import PageTitle from 'components/PageTitle';


const DashboardPage = () => (
  <Pane>
    <PageTitle
      title="Dashboard"
      subtitle="This is an overview of your account."
    />
  </Pane>
);

export default DashboardPage;
