import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#1d4ed8',
    },
    background: {
      default: '#f5f8fc',
      paper: '#dde8f2',
    },
    text: {
      primary: '#0d1f2d',
      secondary: '#4a6580',
    },
    divider: '#b8cedd',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
