import {
  brand as brandColor,
  intent as intentColor,
  neutral as neutralColor,
} from 'theme/colors';


// eslint-disable-next-line
export const getStatusColor = (status) => {
  const backgroundColors = {
    connected: intentColor.success,
    online: brandColor.primary,
    offline: neutralColor.dark,
  };

  return backgroundColors[status];
};

export const formatPassword = (password) => {
  if (!password) {
    return '';
  }

  const passwordChunks = [];
  let lastChunk = '';

  password
    .split('')
    .forEach((character) => {
      if (lastChunk.length === 4) {
        passwordChunks.push(lastChunk);
        lastChunk = '';
      }

      lastChunk += character;
    });

  if (lastChunk.length) {
    passwordChunks.push(lastChunk);
  }

  return passwordChunks.join('-');
};
