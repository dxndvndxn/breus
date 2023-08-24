import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { AppRouting } from './app/routing/AppRouting';
import './index.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

// root.render(<AppRouting />);

if (rootElement.hasChildNodes()) {
  console.log('Hi');
  hydrateRoot(rootElement, <AppRouting />);
} else {
  root.render(<AppRouting />);
}
