import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Chance from 'chance';
import { useImmerReducer } from 'use-immer';

import { getSecondsSinceEpoch, noOp } from 'utils';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';

const initialState = {};

export const actionTypes = {
  REMOVE_CONNECTION_REQUEST: 'REMOVE_CONNECTION_REQUEST',
  UPDATE_CONNECTION_REQUEST: 'UPDATE_CONNECTION_REQUEST',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_CONNECTION_REQUEST): {
      const { password } = action.payload;
      draft[password] = action.payload || {};
      break;
    }

    case (actionTypes.REMOVE_CONNECTION_REQUEST): {
      draft[action.payload] = null;
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const ConnectionRequests = ({ children }) => {
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
            type: actionTypes.REMOVE_CONNECTION_REQUEST,
            payload: id,
          });

          return;
        }

        localDispatch({
          type: actionTypes.UPDATE_CONNECTION_REQUEST,
          payload: change.doc.data(),
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('connectionRequests').where('uid', '==', uid);
    const unsubscribeFromConnectionRequests = queryResult.onSnapshot(handleUpdate);


    return unsubscribeFromConnectionRequests;
  }, [localDispatch, uid]);


  // FIXME - handle Firebase error;
  const killConnectionRequest = ({ password }) => {
    const db = firebase.firestore();
    db.collection('connectionRequests').doc(password).delete();
  };

  // FIXME - handle Firebase error;
  const createConnectionRequest = () => {
    const chance = new Chance();
    const password = chance.string({
      length: 6,
      casing: 'upper',
      alpha: true,
      numeric: true,
    });

    const db = firebase.firestore();

    db.collection('connectionRequests').doc(password).set({
      createdAt: getSecondsSinceEpoch(),
      password,
      uid,
    });
  };

  const dispatch = {
    createConnectionRequest,
    killConnectionRequest,
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ConnectionRequests.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConnectionRequests;
