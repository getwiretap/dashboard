import React from 'react';
import { Pane } from 'evergreen-ui';

import MarginLogo from 'components/MarginLogo';
import Navigation from 'containers/Navigation';


const Margin = () => (
  <Pane
    position="fixed"
    top={0}
    bottom={0}
    display="flex"
    flexDirection="column"
    width={280}
    paddingTop={40}
    paddingBottom={40}
    background="white"
    elevation={2}
    overflow="none"
  >
    <MarginLogo />
    <Navigation />
  </Pane>
);

export default Margin;
