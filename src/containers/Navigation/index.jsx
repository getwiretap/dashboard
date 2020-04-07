import React from 'react';
import { Pane } from 'evergreen-ui';

import NavLink from 'containers/NavLink';
import {
  CASHIERS,
  DASHBOARD,
  DEVICES,
  LOGOUT,
  PROMPTS,
  SETTINGS,
} from 'routes';


const routes = [
  {
    displayName: 'Dashboard',
    iconName: 'home',
    requiresExact: true,
    to: DASHBOARD,
  },
  {
    displayName: 'Cashiers',
    iconName: 'headset',
    to: CASHIERS,
  },
  {
    displayName: 'Prompts',
    iconName: 'console',
    to: PROMPTS,
  },
  {
    displayName: 'Devices',
    iconName: 'mobile-phone',
    to: DEVICES,
  },
  {
    displayName: 'Settings',
    iconName: 'cog',
    to: SETTINGS,
  },
  {
    displayName: 'Logout',
    iconName: 'lock',
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
            key={route.displayName}
            displayName={route.displayName}
            iconName={route.iconName}
            requiresExact={route.requiresExact}
            spaceBefore={route.spaceBefore}
            to={route.to}
          />
        ))
    }
  </Pane>
);

export default Navigation;
