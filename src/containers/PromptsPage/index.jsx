import React from 'react';
import { Pane } from 'evergreen-ui';

import CreateNewPromptButton from 'containers/CreateNewPromptButton';
import PageTitle from 'components/PageTitle';
import PromptDetailsDialog from 'containers/PromptDetailsDialog';
import Prompts from 'containers/Prompts';


const PromptsPage = () => (
  <Pane>
    <PageTitle
      title="Prompts"
      subtitle="You can manage your prompts here."
    />
    <Prompts />
    <CreateNewPromptButton />
    <PromptDetailsDialog />
  </Pane>
);

export default PromptsPage;
