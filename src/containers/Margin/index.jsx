import React from 'react';
import { Pane } from 'evergreen-ui';

import Navigation from 'containers/Navigation';


const Margin = () => (
  <Pane
    display="flex"
    flexDirection="column"
    width={260}
    paddingTop={40}
    paddingBottom={40}
    background="white"
    elevation={1}
  >
    <Navigation />
  </Pane>
);

export default Margin;
