import {
  brand as brandColor,
  intent as intentColor,
  neutral as neutralColor,
} from 'theme/colors';


export const getSessionStatus = (session) => {
  let status = 'offline';

  if (!session) { return status; }

  const { deviceId, password } = session;

  if (password) { status = 'online'; }
  if (deviceId) { status = 'connected'; }

  return status;
};


export const getSessionStatusDisplayName = (session) => {
  if (!session) { return 'Offline'; }

  const displayNames = {
    online: 'Waiting for connection...',
    connected: `Connected to ${session.deviceName}`,
  };

  const status = getSessionStatus(session);

  return displayNames[status];
};


export const getSessionColor = (session) => {
  const status = getSessionStatus(session);

  const backgroundColors = {
    connected: intentColor.success,
    online: brandColor.primary,
    offline: neutralColor.dark,
  };

  return backgroundColors[status];
};


export const formatPassword = (password) => {
  if (!password) { return ''; }

  let passwordChunk = '';
  const passwordChunks = [];

  console.log('pass', password);

  password
    .split('')
    .forEach((character) => {
      passwordChunk += character;

      if (passwordChunk.length === 4) {
        passwordChunks.push(passwordChunk);
        passwordChunk = '';
      }
    });

  return passwordChunks.join('-');
};
