import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { background } from 'theme/colors';
// import { fontFamily } from 'theme/typography';


const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    // font-family: FIX-ME;

    background: ${background.tint1};
  };
`;

export default GlobalStyles;
