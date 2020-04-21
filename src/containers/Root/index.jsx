import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'evergreen-ui';

import App from 'containers/App';
import Authentication from 'state/Authentication';
import Cashiers from 'state/Cashiers';
import GlobalStyles from 'components/GlobalStyles';
import Prompts from 'state/Prompts';
import SessionPasswords from 'state/SessionPasswords';
import Sessions from 'state/Sessions';
import User from 'state/User';
import themeOverride from 'theme/evergreenOverride';


const Root = () => (
  <>
    <ThemeProvider value={themeOverride}>
      <BrowserRouter>
        <Authentication>
          <User>
            <SessionPasswords>
              <Sessions>
                <Cashiers>
                  <Prompts>
                    <App />
                  </Prompts>
                </Cashiers>
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
