import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { StateContext as AuthenticationStateContext } from 'state/Authentication';


const initialState = {
  email: null,
  displayName: null,
  photoURL: null,
  isUserLoaded: false,
};

export const actionTypes = {
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_USER): {
      draft.displayName = action.payload.displayName || null;
      draft.email = action.payload.email || null;
      draft.photoURL = action.payload.photoURL || null;
      draft.isUserLoaded = true;
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();

const User = ({ children }) => {
  const { email } = useContext(AuthenticationStateContext);
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const updateUser = (userData) => {
    dispatch({
      payload: userData,
      type: actionTypes.UPDATE_USER,
    });
  };

  const handleSnapshotChanges = (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const userData = change.doc.data();
      updateUser(userData);
    });
  };

  const db = firebase.firestore();
  const queryResult = db.collection('users').where('email', '==', email);

  const unsubscribeFromUser = queryResult.onSnapshot(handleSnapshotChanges);

  // Unsubscribe from User on dismount
  useEffect(() => unsubscribeFromUser, [unsubscribeFromUser]);

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
