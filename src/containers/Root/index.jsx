import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from 'containers/App';
import GlobalStyles from 'components/GlobalStyles';
import Transcription from 'state/Transcription';


const Root = () => (
  <>
    <Transcription>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Transcription>
    <GlobalStyles />
  </>
);

export default Root;
