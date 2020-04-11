import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Chance from 'chance';
import { useImmerReducer } from 'use-immer';

import { getSecondsSinceEpoch, noOp } from 'utils';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';

const initialState = {};

export const actionTypes = {
  REMOVE_SESSION_PASSWORD: 'REMOVE_SESSION_PASSWORD',
  UPDATE_SESSION_PASSWORD: 'UPDATE_SESSION_PASSWORD',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_SESSION_PASSWORD): {
      const { password } = action.payload;
      draft[password] = action.payload || {};
      break;
    }

    case (actionTypes.REMOVE_SESSION_PASSWORD): {
      delete draft[action.payload];
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const SessionPasswords = ({ children }) => {
  const { uid } = useContext(AuthenticationStateContext);
  const [state, localDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    // Do not connect to Firestore if user is logged out
    if (!uid) {
      return noOp;
    }

    const handleUpdate = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const { id } = change.doc;

        if (change.type === 'removed') {
          localDispatch({
            type: actionTypes.REMOVE_SESSION_PASSWORD,
            payload: id,
          });

          return;
        }

        localDispatch({
          type: actionTypes.UPDATE_SESSION_PASSWORD,
          payload: change.doc.data(),
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('sessionPasswords').where('uid', '==', uid);
    const unsubscribeFromSessionPasswords = queryResult.onSnapshot(handleUpdate);


    return unsubscribeFromSessionPasswords;
  }, [localDispatch, uid]);


  // FIXME - handle Firebase error;
  const deleteSessionPassword = (password) => {
    const db = firebase.firestore();
    db.collection('sessionPasswords').doc(password).delete();
  };

  // FIXME - handle Firebase error;
  const createSessionPassword = () => {
    const chance = new Chance();
    const password = chance.string({
      length: 12,
      numeric: true,
    });

    const db = firebase.firestore();

    db.collection('sessionPasswords').doc(password).set({
      createdAt: getSecondsSinceEpoch(),
      password,
      uid,
    });
  };

  const dispatch = {
    createSessionPassword,
    deleteSessionPassword,
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

SessionPasswords.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SessionPasswords;
