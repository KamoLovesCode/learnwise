import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

// Import Google's Roboto font for Material Design
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
document.head.appendChild(link);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
