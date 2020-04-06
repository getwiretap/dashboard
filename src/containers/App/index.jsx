import React, { useContext } from 'react';

import Authenticated from 'containers/Authenticated';
import FullPageLoader from 'components/FullPageLoader';
import Login from 'containers/Login';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';


const App = () => {
  const { isAuthenticated, isAuthenticationLoaded } = useContext(AuthenticationStateContext);

  if (!isAuthenticationLoaded) {
    return <FullPageLoader />;
  }

  return isAuthenticated ? <Authenticated /> : <Login />;
};

export default App;
