import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from 'containers/App';
import Authentication from 'state/Authentication';
import GlobalStyles from 'components/GlobalStyles';
import User from 'state/User';


const Root = () => (
  <>
    <BrowserRouter>
      <Authentication>
        <User>
          <App />
        </User>
      </Authentication>
    </BrowserRouter>
    <GlobalStyles />
  </>
);

export default Root;
