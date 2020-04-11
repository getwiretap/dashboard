import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'evergreen-ui';

import App from 'containers/App';
import Authentication from 'state/Authentication';
import GlobalStyles from 'components/GlobalStyles';
import SessionPasswords from 'state/SessionPasswords';
import User from 'state/User';
import Sessions from 'state/Sessions';
import themeOverride from 'theme/evergreenOverride';


const Root = () => (
  <>
    <ThemeProvider value={themeOverride}>
      <BrowserRouter>
        <Authentication>
          <User>
            <SessionPasswords>
              <Sessions>
                <App />
              </Sessions>
            </SessionPasswords>
          </User>
        </Authentication>
      </BrowserRouter>
    </ThemeProvider>
    <GlobalStyles />
  </>
);

export default Root;
