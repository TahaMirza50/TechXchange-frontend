import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './provider/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReduxProvider } from './provider/ReduxProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
