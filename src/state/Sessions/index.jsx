import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { noOp } from 'utils';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';

const initialState = {};

export const actionTypes = {
  REMOVE_SESSION: 'REMOVE_SESSION',
  UPDATE_SESSION: 'UPDATE_SESSION',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_SESSION): {
      const { sessionId } = action.meta;
      draft[sessionId] = action.payload;
      break;
    }

    case (actionTypes.REMOVE_SESSION): {
      delete draft[action.payload];
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
    // Do not connect to Firestore if user is logged out
    if (!uid) {
      return noOp;
    }

    const handleUpdate = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const { id: sessionId } = change.doc;

        if (change.type === 'removed') {
          localDispatch({
            type: actionTypes.REMOVE_SESSION,
            payload: sessionId,
          });

          return;
        }

        localDispatch({
          type: actionTypes.UPDATE_SESSION,
          payload: change.doc.data(),
          meta: { sessionId },
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('sessions').where('uid', '==', uid);
    const unsubscribeFromSessions = queryResult.onSnapshot(handleUpdate);

    return unsubscribeFromSessions;
  }, [localDispatch, uid]);


  // FIXME - handle Firebase error;
  const killSession = (sessionId) => {
    const db = firebase.firestore();
    db.collection('sessions').doc(sessionId).delete();
  };

  const dispatch = {
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
