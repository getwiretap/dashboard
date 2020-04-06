import React from 'react';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const LoginButtons = () => {
  const firebaseAuth = firebase.auth();

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <StyledFirebaseAuth
      firebaseAuth={firebaseAuth}
      uiConfig={uiConfig}
    />
  );
};

export default LoginButtons;
