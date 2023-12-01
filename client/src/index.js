import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ComplaintContextProvider } from './context/ComplaintsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ComplaintContextProvider>
      <App />
    </ComplaintContextProvider>
  </React.StrictMode>
)