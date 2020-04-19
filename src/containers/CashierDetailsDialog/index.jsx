import React, { useContext } from 'react';
import get from 'lodash.get';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  Heading,
  Pane,
  TextInputField,
} from 'evergreen-ui';

import { CASHIERS, CASHIER_NEW, CASHIER_EDIT } from 'routes';
import {
  StateContext as CashiersState,
  DispatchContext as CashiersDispatch,
} from 'state/Cashiers';


const CashierDetailsDialog = () => {
  const cashiers = useContext(CashiersState);
  const cashierDispatch = useContext(CashiersDispatch);
  const newMatch = useRouteMatch(CASHIER_NEW);
  const editMatch = useRouteMatch(CASHIER_EDIT);
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const isNew = get(newMatch, 'isExact', false);

  const cashierId = get(editMatch, 'params.cashierId');
  const cashier = get(cashiers, cashierId);

  const isShown = Boolean(isNew || cashier);

  const closeDialog = () => history.push(CASHIERS);

  const createCashier = async (formData) => {
    await cashierDispatch.createCashier(formData);
    closeDialog();
  };

  const onSubmit = createCashier;
  const onSubmitButtonText = 'Create';

  return (
    <Dialog
      isShown={isShown}
      title="Dialog title"
      confirmLabel="Custom Label"
      onCloseComplete={closeDialog}
      hasCancel={false}
      hasFooter={false}
      hasHeader={false}
    >
      <Heading
        size={700}
        marginTop={20}
        marginBottom={25}
      >
        Create a new cashier
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextInputField}
          control={control}
          label="Full name"
          name="displayName"
        />
        <Controller
          as={TextInputField}
          control={control}
          label="4-digit access code"
          name="password"
        />
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            type="submit"
            appearance="primary"
          >
            { onSubmitButtonText }
          </Button>
        </Pane>
      </form>
    </Dialog>
  );
};

export default CashierDetailsDialog;
