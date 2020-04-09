import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { StateContext as AuthenticationStateContext } from 'state/Authentication';


const initialState = {};

export const actionTypes = {
  REMOVE_SESSION: 'REMOVE_SESSION',
  UPDATE_SESSION: 'UPDATE_SESSION',
};

const reducer = (draft, action) => {
  const { id } = action.meta;

  switch (action.type) {
    case (actionTypes.UPDATE_SESSION): {
      draft[id] = action.payload || {};
      break;
    }

    case (actionTypes.REMOVE_SESSION): {
      draft[id] = null;
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const Sessions = ({ children }) => {
  const { uid } = useContext(AuthenticationStateContext);
  const [state, localDispatch] = useImmerReducer(reducer, initialState);


  useEffect(() => {
    const handleSessionsChanges = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const { id } = change.doc;

        if (change.type === 'removed') {
          localDispatch({
            type: actionTypes.REMOVE_SESSION,
            meta: { id },
          });

          return;
        }

        const data = change.doc.data();
        const dataWithId = { ...data, id };

        localDispatch({
          type: actionTypes.UPDATE_SESSION,
          payload: dataWithId,
          meta: { id },
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('sessions').where('userId', '==', uid);
    const unsubscribeFromSessions = queryResult.onSnapshot(handleSessionsChanges);


    return unsubscribeFromSessions;
  }, [localDispatch, uid]);


  // FIXME - handle Firebase error;
  const killSession = ({ id }) => {
    const db = firebase.firestore();
    db.collection('sessions').doc(id).delete();
  };

  // FIXME - handle Firebase error;
  const createSession = () => {
    const password = String(Math.round(Math.random() * 1000000000000));

    const now = new Date();
    const createdAt = now.getTime();

    console.log(createdAt);

    const db = firebase.firestore();
    db.collection('sessions').doc(password).set({
      createdAt,
      deviceId: null,
      deviceName: null,
      password,
      userId: uid,
    });
  };

  const dispatch = {
    createSession,
    killSession,
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

Sessions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sessions;
