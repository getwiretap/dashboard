import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { StateContext as AuthenticationStateContext } from 'state/Authentication';


const initialState = {
  displayName: null,
  email: null,
  isUserLoaded: false,
  photoURL: null,
  plan: null,
};

const defaultValues = {
  plan: { name: 'basic', devices: 0 },
};

export const actionTypes = {
  UPDATE_USER: 'UPDATE_USER',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_USER): {
      draft.displayName = action.payload.displayName || null;
      draft.email = action.payload.email || null;
      draft.isUserLoaded = true;
      draft.photoURL = action.payload.photoURL || null;
      draft.plan = action.payload.plan || defaultValues.plan;
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const User = ({ children }) => {
  const { uid } = useContext(AuthenticationStateContext);
  const [state, dispatch] = useImmerReducer(reducer, initialState);


  useEffect(() => {
    const handleUserChanges = (maybeUser) => {
      const userData = maybeUser.exists ? maybeUser.data() : {};

      dispatch({ payload: userData, type: actionTypes.UPDATE_USER });
    };

    const db = firebase.firestore();
    const userDoc = db.collection('users').doc(uid);
    const unsubscribeFromUser = userDoc.onSnapshot(handleUserChanges);

    return unsubscribeFromUser;
  }, [dispatch, uid]);


  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

User.propTypes = {
  children: PropTypes.node.isRequired,
};

export default User;
