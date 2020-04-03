import React from 'react';
import { render } from 'react-dom';

import Root from 'containers/Root';
import * as serviceWorker from './serviceWorker';

const node = (
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

const mount = document.getElementById('root');

render(node, mount);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
