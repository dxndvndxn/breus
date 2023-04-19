import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { AppRouting } from './app/routing/AppRouting';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<AppRouting />);
