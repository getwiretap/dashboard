import React, { useContext } from 'react';
import get from 'lodash.get';
import range from 'lodash.range';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  Heading,
  Pane,
  TextInputField,
} from 'evergreen-ui';

import { PROMPTS, PROMPT_NEW, PROMPT_EDIT } from 'routes';
import {
  StateContext as PromptState,
  DispatchContext as PromptDispatch,
} from 'state/Prompts';


const PromptDetailsDialog = () => {
  const prompts = useContext(PromptState);
  const promptDispatch = useContext(PromptDispatch);
  const newMatch = useRouteMatch(PROMPT_NEW);
  const editMatch = useRouteMatch(PROMPT_EDIT);
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const isNew = get(newMatch, 'isExact', false);

  const promptId = get(editMatch, 'params.promptId');
  const prompt = get(prompts, promptId);

  const isShown = Boolean(isNew || prompt);

  const closeDialog = () => history.push(PROMPTS);

  const createPrompt = async (formData) => {
    await promptDispatch.createPrompt(formData);
    closeDialog();
  };

  const onSubmit = createPrompt;
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
        Create a new prompt
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextInputField}
          control={control}
          label="Visible prompt"
          placeholder="Welcome to Pizza Planet..."
          name="displayName"
        />
        <Pane marginLeft={20}>
          {
            range(10)
              .map((index) => {
                const fieldName = `variants[${index}]`;
                const label = `Acceptable variant #${index + 1}`;

                return (
                  <Controller
                    key={index}
                    as={TextInputField}
                    control={control}
                    label={label}
                    name={fieldName}
                  />
                );
              })
          }
        </Pane>
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

export default PromptDetailsDialog;
