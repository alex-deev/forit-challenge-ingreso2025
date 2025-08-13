import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';

// Interfas para extender las propiedades del objeto Window
// Agrega prop config, con las variables que se utilizarán para producción
// Requiere que estas estén definidas en el script config.js
declare global {
  interface Window {
    config: {
      APP_EXTERNAL_API_URL: string;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
