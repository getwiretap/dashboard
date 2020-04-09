import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'evergreen-ui';

import App from 'containers/App';
import Authentication from 'state/Authentication';
import GlobalStyles from 'components/GlobalStyles';
import Sessions from 'state/Sessions';
import User from 'state/User';
import themeOverride from 'theme/evergreenOverride';


const Root = () => (
  <>
    <ThemeProvider value={themeOverride}>
      <BrowserRouter>
        <Authentication>
          <User>
            <Sessions>
              <App />
            </Sessions>
          </User>
        </Authentication>
      </BrowserRouter>
    </ThemeProvider>
    <GlobalStyles />
  </>
);

export default Root;
