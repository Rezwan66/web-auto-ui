import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-blue-50 mx-auto px-0 py-0">
      <App />
    </div>
  </StrictMode>
);
