import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { useImmerReducer } from 'use-immer';


const initialState = {
  browserSupportsSpeechRecognition: false,
  isListening: false,
  transcription: '',
};

const reducer = (draft, newState) => {
  draft.browserSupportsSpeechRecognition = newState.browserSupportsSpeechRecognition;
  draft.isListening = newState.isListening;
  draft.transcription = newState.transcription;
};


export const StateContext = createContext();
export const DispatchContext = createContext();


const Transcription = ({
  browserSupportsSpeechRecognition,
  children,
  listening: isListening,
  resetTranscript,
  transcript: transcription,
}) => {
  const [state, updateState] = useImmerReducer(reducer, initialState);
  const dispatch = { resetTranscript };

  const shouldUpdateState = (
    state.isListening !== isListening
      || state.browserSupportsSpeechRecognition !== browserSupportsSpeechRecognition
      || state.transcription !== transcription
  );

  if (shouldUpdateState) {
    updateState({ browserSupportsSpeechRecognition, isListening, transcription });
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        { children }
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

Transcription.propTypes = {
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  transcript: PropTypes.string,
  listening: PropTypes.bool.isRequired,
  resetTranscript: PropTypes.func.isRequired,
};

Transcription.defaultProps = {
  transcript: '',
};

const speechRecognitionOptions = {
  autoStart: true,
  continuous: true,
};


export default SpeechRecognition(speechRecognitionOptions)(Transcription);
