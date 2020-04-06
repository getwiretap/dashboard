import React from 'react';
import { Pane } from 'evergreen-ui';

import NavLink from 'containers/NavLink';
import {
  CASHIERS,
  DASHBOARD,
  LOGOUT,
  PROMPTS,
  SESSIONS,
} from 'routes';


const routes = [
  {
    displayName: 'Dashboard',
    requiresExact: true,
    to: DASHBOARD,
  },
  {
    displayName: 'Sessions',
    to: SESSIONS,
  },
  {
    displayName: 'Cashiers',
    to: CASHIERS,
  },
  {
    displayName: 'Prompts',
    to: PROMPTS,
  },
  {
    displayName: 'Logout',
    spaceBefore: true,
    to: LOGOUT,
  },
];


const Navigation = () => (
  <Pane
    display="flex"
    flexDirection="column"
  >
    {
      routes
        .map((route) => (
          <NavLink
            displayName={route.displayName}
            key={route.displayName}
            requiresExact={route.requiresExact}
            spaceBefore={route.spaceBefore}
            to={route.to}
          />
        ))
    }
  </Pane>
);

export default Navigation;
