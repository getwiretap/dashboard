import React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { Card, Pane } from 'evergreen-ui';

import LoginButtons from 'containers/LoginButtons';
import Logo from 'components/Logo';
import { scales } from 'theme/colors';
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
      <Card
        display="flex"
        alignItems="strech"
      >
        <Pane
          display="flex"
          alignItems="center"
          paddingLeft={14}
          paddingRight={14}
        >
          <Logo width={200} />
        </Pane>
        <Pane
          display="flex"
          alignItems="stetch"
          marginLeft={40}
          marginRight={40}
          width={1}
          backgroundColor={scales.N4}
        />
        <LoginButtons />
      </Card>
    </Pane>
  );
};

export default Login;
