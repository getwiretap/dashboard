import React from 'react';
import firebase from 'firebase/app';
import { render } from 'react-dom';

import Root from 'containers/Root';
import * as serviceWorker from './serviceWorker';

import 'firebase/auth';
import 'firebase/firestore';


const {
  REACT_APP_FIREBASE_API_KEY: apiKey,
  REACT_APP_FIREBASE_APP_ID: appId,
  REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
  REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
  REACT_APP_FIREBASE_MEASUREMENT_ID: measurementId,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
  REACT_APP_FIREBASE_PROJECT_ID: projectId,
  REACT_APP_FIREBASE_STORAGE_BUCKET: storageBucket,
} = process.env;


// Setting up firebase
firebase.initializeApp({
  apiKey,
  appId,
  authDomain,
  databaseURL,
  measurementId,
  messagingSenderId,
  projectId,
  storageBucket,
});


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
