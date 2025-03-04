import CustomPalette from '@common/theme/palette/type';
import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  50: '#F8F7FA',
  100: '#EEEDF2',
  200: '#DBDAE3',
  300: '#A9A8B3',
  400: '#6F7287',
  500: '#4B4D63',
  600: '#39364F',
  700: '#2E2A39',
  800: '#1E0A3C',  // Eventbrite primary dark
  900: '#1B0934',
  A100: '#F8F7FA',
  A200: '#EEEDF2',
  A400: '#6F7287',
  A700: '#39364F',
};

const PRIMARY = {
  lighter: '#F8D4CC',
  light: '#F3A597',
  main: '#D1410C',  // Eventbrite orange
  dark: '#B23509',
  darker: '#8F2A07',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#C9C7EF',
  light: '#9B97E2',
  main: '#3D64FF',  // Eventbrite blue
  dark: '#2B47B3',
  darker: '#1C2F75',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#CCE5FF',
  light: '#85C1FF',
  main: '#1583E9',  // Eventbrite info blue
  dark: '#0E5CA6',
  darker: '#093D6F',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#D4F4D7',
  light: '#8FE497',
  main: '#3AB54A',  // Eventbrite green
  dark: '#298035',
  darker: '#1B5523',
  contrastText: '#fff',
};

const WARNING = {
  lighter: '#FFF3CC',
  light: '#FFE085',
  main: '#F8C842',  // Eventbrite yellow
  dark: '#AF8C2E',
  darker: '#735D1F',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFD4CC',
  light: '#FF9585',
  main: '#F05537',  // Eventbrite red
  dark: '#A83B26',
  darker: '#702719',
  contrastText: '#fff',
};

const palette: CustomPalette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[300], 0.24),
  text: {
    primary: GREY[800],      // Dark purple
    secondary: GREY[400],    // Medium grey
    disabled: GREY[300],     // Light grey
  },
  background: {
    paper: '#fff',
    default: GREY[50],       // Very light grey
    neutral: GREY[100],      // Light grey
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
