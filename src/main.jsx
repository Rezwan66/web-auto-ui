import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div
      className="bg-black mx-auto px-0 py-0 relative bg-repeat bg-center bg-[length:1000px_1000px]"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1645839057098-5ea8761a6b09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      {/* <div
        className="absolute inset-0 bg-repeat bg-center bg-[length:1080px_1080px] opacity-50"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1645839057098-5ea8761a6b09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundAttachment: 'fixed',
        }}
      /> */}
      <App />
    </div>
  </StrictMode>
);
