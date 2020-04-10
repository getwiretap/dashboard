import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'evergreen-ui';

import App from 'containers/App';
import Authentication from 'state/Authentication';
import GlobalStyles from 'components/GlobalStyles';
import ConnectionRequests from 'state/ConnectionRequests';
import User from 'state/User';
import Sessions from 'state/Sessions';
import themeOverride from 'theme/evergreenOverride';


const Root = () => (
  <>
    <ThemeProvider value={themeOverride}>
      <BrowserRouter>
        <Authentication>
          <User>
            <ConnectionRequests>
              <Sessions>
                <App />
              </Sessions>
            </ConnectionRequests>
          </User>
        </Authentication>
      </BrowserRouter>
    </ThemeProvider>
    <GlobalStyles />
  </>
);

export default Root;
