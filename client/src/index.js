import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ComplaintContextProvider } from './context/ComplaintsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ComplaintContextProvider>
        <App />
      </ComplaintContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)