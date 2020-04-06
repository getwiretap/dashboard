import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Pane } from 'evergreen-ui';

import Logout from 'containers/Logout';
import { LOGOUT } from 'routes';


const Content = () => (
  <Pane
    display="flex"
    padding={40}
  >
    <Switch>
      <Route exact path={LOGOUT} component={Logout} />
    </Switch>
  </Pane>
);

export default Content;
