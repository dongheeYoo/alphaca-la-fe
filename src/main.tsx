import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
