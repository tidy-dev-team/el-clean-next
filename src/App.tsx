import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import DarkBlueScreen from './DarkBlueScreen';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DarkBlueScreen />
    </ThemeProvider>
  );
}
