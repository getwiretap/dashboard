import React from 'react';
import { Pane } from 'evergreen-ui';

import MarginLogo from 'components/MarginLogo';
import Navigation from 'containers/Navigation';


const Margin = () => (
  <Pane
    display="flex"
    flexDirection="column"
    width={280}
    paddingTop={40}
    paddingBottom={40}
    background="white"
    elevation={3}
  >
    <MarginLogo />
    <Navigation />
  </Pane>
);

export default Margin;
