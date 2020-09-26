import React from 'react';
import './App.css';
import Contents from './components/contents/Contents';
import Header from "./components/header/Header";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#CC0000',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Contents />
      </div>
    </ThemeProvider>
  );
}

export default App;
