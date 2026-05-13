import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Main Screen</h1>
      <CssBaseline />
    </ThemeProvider>
  );
}
