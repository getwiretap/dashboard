import React from 'react';
import styled from 'styled-components';

import Loader from 'components/Loader';


const FullPage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;


const FullPageLoader = () => (
  <FullPage>
    <Loader />
  </FullPage>
);

export default FullPageLoader;
