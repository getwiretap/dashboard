import React from 'react';
import { Pane } from 'evergreen-ui';
import { Link } from 'react-router-dom';

import Logo from 'components/Logo';
import { INDEX } from 'routes';


const MarginLogo = () => (
  <Pane marginBottom={50}>
    <Link to={INDEX}>
      <Pane
        display="flex"
        alignItems="center"
        height={40}
        paddingLeft={40}
      >
        <Logo width={170} />
      </Pane>
    </Link>
  </Pane>
);

export default MarginLogo;
