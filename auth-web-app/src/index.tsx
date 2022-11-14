// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// App
import App from './routes/App';

// Styles
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
