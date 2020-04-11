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
