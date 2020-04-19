import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pane } from 'evergreen-ui';

import CashiersPage from 'containers/CashiersPage';
import DashboardPage from 'containers/DashboardPage';
import DevicesPage from 'containers/DevicesPage';
import Logout from 'containers/Logout';
import PromptsPage from 'containers/PromptsPage';
import SettingsPage from 'containers/SettingsPage';
import {
  CASHIERS,
  DASHBOARD,
  DEVICES,
  LOGOUT,
  PROMPTS,
  SETTINGS,
} from 'routes';


const Content = () => (
  <Pane
    padding={40}
    marginLeft={280}
  >
    <Switch>
      <Route path={DASHBOARD} component={DashboardPage} exact />
      <Route path={PROMPTS} component={PromptsPage} />
      <Route path={CASHIERS} component={CashiersPage} />
      <Route path={DEVICES} component={DevicesPage} />
      <Route path={SETTINGS} component={SettingsPage} />
      <Route path={LOGOUT} component={Logout} />
    </Switch>
  </Pane>
);

export default Content;
