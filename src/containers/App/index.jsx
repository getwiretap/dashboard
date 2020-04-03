import React, { useContext } from 'react';

import { StateContext as TranscriptionStateContext } from 'state/Transcription';


const App = () => {
  const { transcription } = useContext(TranscriptionStateContext);

  return (
    <div>
      { transcription }
    </div>
  );
};

export default App;
