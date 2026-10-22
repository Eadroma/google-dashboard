import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Side effect: runs every *.register.ts so the widget registry is filled before render.
import '@widgets/index';
import { App } from '@app/App';
import '@app/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in the document.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
