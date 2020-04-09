import { defaultTheme } from 'evergreen-ui';


import { fontFamilies } from 'theme/typography';


const themeOverride = { ...defaultTheme };

themeOverride.typography.fontFamilies.display = fontFamilies.display;
themeOverride.typography.fontFamilies.ui = fontFamilies.display;
themeOverride.typography.fontFamilies.mono = fontFamilies.mono;

themeOverride.typography.fontFamilies.mono = fontFamilies.mono;

const headingStyles = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const headingFontWeights = [400, 400, 400, 400, 400, 400, 400, 400, 400];
headingStyles.forEach((style, index) => {
  themeOverride.typography.headings[style].fontFamily = fontFamilies.display;
  themeOverride.typography.headings[style].fontWeight = headingFontWeights[index];
});


export default themeOverride;
