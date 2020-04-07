import React, { useContext } from 'react';

import Authenticated from 'containers/Authenticated';
import Login from 'containers/Login';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';


const App = () => {
  const { isAuthenticated } = useContext(AuthenticationStateContext);

  return isAuthenticated ? <Authenticated /> : <Login />;
};

export default App;
