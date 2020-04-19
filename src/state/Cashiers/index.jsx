import React, { createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useImmerReducer } from 'use-immer';

import { noOp } from 'utils';
import { StateContext as AuthenticationStateContext } from 'state/Authentication';

const initialState = {};

export const actionTypes = {
  REMOVE_CASHIER: 'REMOVE_CASHIER',
  UPDATE_CASHIER: 'UPDATE_CASHIER',
};

const reducer = (draft, action) => {
  switch (action.type) {
    case (actionTypes.UPDATE_CASHIER): {
      const { cashierId } = action.meta;
      draft[cashierId] = action.payload;
      break;
    }

    case (actionTypes.REMOVE_CASHIER): {
      delete draft[action.payload];
      break;
    }

    default:
  }
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const Cashiers = ({ children }) => {
  const { uid } = useContext(AuthenticationStateContext);
  const [state, localDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    // Do not connect to Firestore if user is logged out
    if (!uid) {
      return noOp;
    }

    const handleUpdate = (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const { id: cashierId } = change.doc;

        if (change.type === 'removed') {
          localDispatch({
            type: actionTypes.REMOVE_CASHIER,
            payload: cashierId,
          });

          return;
        }

        localDispatch({
          type: actionTypes.UPDATE_CASHIER,
          payload: change.doc.data(),
          meta: { cashierId },
        });
      });
    };

    const db = firebase.firestore();
    const queryResult = db.collection('cashiers').where('uid', '==', uid);
    const unsubscribeFromCashiers = queryResult.onSnapshot(handleUpdate);

    return unsubscribeFromCashiers;
  }, [localDispatch, uid]);


  // FIXME - handle Firebase error;
  const createCashier = (cashierData) => {
    const { displayName, password } = cashierData;

    const dataWithUid = {
      displayName,
      password,
      uid,
    };

    const db = firebase.firestore();

    return db.collection('cashiers').add(dataWithUid);
  };


  // FIXME - handle Firebase error;
  const deleteCashier = (cashierId) => {
    const db = firebase.firestore();

    return db.collection('cashiers').doc(cashierId).delete();
  };

  const dispatch = {
    createCashier,
    deleteCashier,
  };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

Cashiers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Cashiers;
