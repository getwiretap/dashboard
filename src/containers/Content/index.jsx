import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pane } from 'evergreen-ui';

import DevicesPage from 'containers/DevicesPage';
import Logout from 'containers/Logout';
import {
  DEVICES,
  LOGOUT,
} from 'routes';


const Content = () => (
  <Pane
    display="flex"
    padding={40}
    marginLeft={280}
  >
    <Switch>
      <Route path={LOGOUT} component={Logout} />
      <Route path={DEVICES} component={DevicesPage} />
    </Switch>
  </Pane>
);

export default Content;
