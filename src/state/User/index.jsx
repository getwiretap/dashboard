import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { noOp } from 'utils';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';


const initialState = {
  isUserLoaded: false,
  user: null,
};


export const actionTypes = {
  UPDATE_USER: 'UPDATE_USER',
  REMOVE_USER: 'REMOVE_USER',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_USER): {
      draft.user = action.payload;
      break;
    }

    case (actionTypes.REMOVE_USER): {
      draft.user = null;
      draft.isUserLoaded = true;
      break;
    }

    default:
  }
};


export const StateContext = createContext();


const User = ({ children }) => {
  const { uid } = useContext(AuthenticationStateContext);
  const [state, dispatch] = useImmerReducer(reducer, initialState);


  useEffect(() => {
    // Do not connect to Firestore if user is logged out
    if (!uid) {
      return noOp;
    }

    const handleUserChanges = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          dispatch({ type: actionTypes.REMOVE_USER });
          return;
        }

        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: change.doc.data(),
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('users').where('uid', '==', uid);

    const unsubscribeFromUsers = queryResult.onSnapshot(handleUserChanges);

    return unsubscribeFromUsers;
  }, [dispatch, uid]);

  return (
    <StateContext.Provider value={state}>
      { children }
    </StateContext.Provider>
  );
};

User.propTypes = {
  children: PropTypes.node.isRequired,
};

export default User;
