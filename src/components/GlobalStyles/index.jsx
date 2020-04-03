import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// import { neutral, tint } from 'theme/colors';
// import { fontFamily } from 'theme/typography';


const GlobalStyles = createGlobalStyle`
  ${reset}


  body {
    font-family: FIX-ME;
  };
`;

export default GlobalStyles;
