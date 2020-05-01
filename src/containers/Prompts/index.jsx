import React, { useContext } from 'react';
import orderBy from 'lodash.orderby';
import { Pane } from 'evergreen-ui';

import PromptCard from 'containers/PromptCard';
import { StateContext as PromptsContext } from 'state/Prompts';


const Prompts = () => {
  const prompts = useContext(PromptsContext);

  const orderedPrompts = orderBy(prompts, 'label');

  return (
    <Pane>
      {
        orderedPrompts.map(({ label }) => (
          <PromptCard
            key={label}
            label={label}
          />
        ))
      }
    </Pane>
  );
};

export default Prompts;
