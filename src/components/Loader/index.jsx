import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { brand as brandColor } from 'theme/colors';


const Loader = () => (
  <ScaleLoader
    height={40}
    width={4}
    radius={4}
    margin={2}
    color={brandColor.primary}
    loading
  />
);

export default Loader;
