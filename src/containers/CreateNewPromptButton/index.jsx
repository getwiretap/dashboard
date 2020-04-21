import React from 'react';
import { Pane } from 'evergreen-ui';

import ButtonLink from 'components/ButtonLink';
import { PROMPT_NEW } from 'routes';


const CreateNewPromptButton = () => (
  <Pane
    display="flex"
    justifyContent="flex-start"
  >
    <ButtonLink
      to={PROMPT_NEW}
      iconName="plus"
      text="Create new prompt"
    />
  </Pane>
);

export default CreateNewPromptButton;
