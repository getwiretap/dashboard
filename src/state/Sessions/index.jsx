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
  const [state, dispatch] = useImmerReducer(reducer, initialState);


  useEffect(() => {
    const handleSessionsChanges = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const { id } = change.doc;

        if (change.type === 'removed') {
          dispatch({
            type: actionTypes.REMOVE_SESSION,
            meta: { id },
          });

          return;
        }

        dispatch({
          type: actionTypes.UPDATE_SESSION,
          payload: change.doc.data(),
          meta: { id },
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('sessions').where('userId', '==', uid);
    const unsubscribeFromSessions = queryResult.onSnapshot(handleSessionsChanges);

    return unsubscribeFromSessions;
  }, [dispatch, uid]);


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
