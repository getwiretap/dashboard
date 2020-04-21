import React, { useContext } from 'react';
import orderBy from 'lodash.orderby';
import { Pane } from 'evergreen-ui';

import PromptCard from 'containers/PromptCard';
import { StateContext as PromptsContext } from 'state/Prompts';


const Prompts = () => {
  const prompts = useContext(PromptsContext);

  const orderedPrompts = orderBy(prompts, 'displayText');

  return (
    <Pane>
      {
        orderedPrompts.map(({ displayName }) => (
          <PromptCard
            key={displayName}
            displayName={displayName}
          />
        ))
      }
    </Pane>
  );
};

export default Prompts;
