import React from 'react';
import { Pane } from 'evergreen-ui';

import Content from 'containers/Content';
import Margin from 'containers/Margin';


const Authenticated = () => (
  <Pane
    display="flex"
    background="tint1"
    height="100vh"
    overflowY="none"
  >
    <Margin />
    <Content />
  </Pane>
);

export default Authenticated;
