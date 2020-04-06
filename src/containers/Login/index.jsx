import React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { Pane } from 'evergreen-ui';

import LoginButtons from 'containers/LoginButtons';
import { INDEX } from 'routes';


const Login = () => {
  const match = useRouteMatch(INDEX);
  const shouldRedirect = !(match && match.isExact);

  if (shouldRedirect) {
    return <Redirect to={INDEX} />;
  }

  return (
    <Pane
      display="flex"
      background="tint1"
      height="100vh"
      overflowY="none"
      alignItems="center"
      justifyContent="center"
    >
      <Pane
        display="flex"
        flexDirection="column"
      >
        <LoginButtons />
      </Pane>
    </Pane>
  );
};

export default Login;
