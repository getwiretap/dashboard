import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';


const initialState = {
  displayName: null,
  email: null,
  isAuthenticated: false,
  isAuthenticationLoaded: false,
  photoURL: null,
};

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.LOGIN): {
      draft.displayName = action.payload.displayName;
      draft.email = action.payload.email;
      draft.isAuthenticated = true;
      draft.isAuthenticationLoaded = true;
      draft.photoURL = action.payload.photoURL;
      break;
    }

    case (actionTypes.LOGOUT): {
      draft.displayName = initialState.displayName;
      draft.email = initialState.email;
      draft.isAuthenticated = false;
      draft.isAuthenticationLoaded = true;
      draft.photoURL = initialState.photoURL;
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();

const Authentication = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const handleAuthChange = async (maybeUser) => {
    if (!maybeUser) {
      dispatch({ type: actionTypes.LOGOUT });
      return;
    }

    dispatch({
      payload: maybeUser,
      type: actionTypes.LOGIN,
    });
  };

  const firebaseAuthentication = firebase.auth();
  const unsubscribeFromAuth = firebaseAuthentication.onAuthStateChanged(handleAuthChange);

  // Unsubscribe from Auth on dismount
  useEffect(() => unsubscribeFromAuth, [unsubscribeFromAuth]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authentication;
