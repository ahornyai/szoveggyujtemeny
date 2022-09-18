import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Settings, SettingsContext } from './contexts/SettingsContext';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SettingsContext.Provider value={new Settings()}>
      <App />
    </SettingsContext.Provider>
  </React.StrictMode>
);
