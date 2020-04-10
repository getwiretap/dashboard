import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import FullPageLoader from 'components/FullPageLoader';


const initialState = {
  isAuthenticated: false,
  isAuthenticationLoaded: false,
  uid: null,
};

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.LOGIN): {
      draft.isAuthenticated = true;
      draft.isAuthenticationLoaded = true;
      draft.uid = action.payload.uid;
      break;
    }

    case (actionTypes.LOGOUT): {
      draft.isAuthenticated = false;
      draft.isAuthenticationLoaded = true;
      draft.uid = initialState.uid;
      break;
    }

    default:
  }
};


export const StateContext = createContext();

const Authentication = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);


  useEffect(() => {
    const handleAuthChange = (maybeUser) => {
      if (!maybeUser) {
        dispatch({ type: actionTypes.LOGOUT });
        return;
      }

      dispatch({ payload: maybeUser, type: actionTypes.LOGIN });
    };

    const firebaseAuthentication = firebase.auth();
    const unsubscribeFromAuth = firebaseAuthentication.onAuthStateChanged(handleAuthChange);

    return () => { unsubscribeFromAuth(); };
  }, [dispatch]);


  if (!state.isAuthenticationLoaded) {
    return <FullPageLoader />;
  }

  return (
    <StateContext.Provider value={state}>
      { children }
    </StateContext.Provider>
  );
};

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authentication;
