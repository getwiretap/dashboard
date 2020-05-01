import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { noOp } from 'utils';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';

const initialState = {};

export const actionTypes = {
  REMOVE_PROMPT: 'REMOVE_PROMPT',
  UPDATE_PROMPT: 'UPDATE_PROMPT',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_PROMPT): {
      const { promptId } = action.meta;
      draft[promptId] = action.payload;
      break;
    }

    case (actionTypes.REMOVE_PROMPT): {
      delete draft[action.payload];
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const Prompts = ({ children }) => {
  const { uid } = useContext(AuthenticationStateContext);
  const [state, localDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    // Do not connect to Firestore if user is logged out
    if (!uid) {
      return noOp;
    }

    const handleUpdate = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const { id: promptId } = change.doc;

        if (change.type === 'removed') {
          localDispatch({
            type: actionTypes.REMOVE_PROMPT,
            payload: promptId,
          });

          return;
        }

        localDispatch({
          type: actionTypes.UPDATE_PROMPT,
          payload: change.doc.data(),
          meta: { promptId },
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('prompts').where('uid', '==', uid);
    const unsubscribeFromPrompts = queryResult.onSnapshot(handleUpdate);

    return unsubscribeFromPrompts;
  }, [localDispatch, uid]);


  // FIXME - handle Firebase error;
  const createPrompt = (promptData) => {
    const db = firebase.firestore();

    const dataWithUid = { ...promptData, uid };

    return db.collection('prompts').add(dataWithUid);
  };


  // FIXME - handle Firebase error;
  const deletePrompt = (promptId) => {
    const db = firebase.firestore();

    return db.collection('prompts').doc(promptId).delete();
  };

  const dispatch = {
    createPrompt,
    deletePrompt,
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

Prompts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Prompts;
