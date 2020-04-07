import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from 'containers/App';
import Authentication from 'state/Authentication';
import GlobalStyles from 'components/GlobalStyles';
import Sessions from 'state/Sessions';
import User from 'state/User';


const Root = () => (
  <>
    <BrowserRouter>
      <Authentication>
        <User>
          <Sessions>
            <App />
          </Sessions>
        </User>
      </Authentication>
    </BrowserRouter>
    <GlobalStyles />
  </>
);

export default Root;
