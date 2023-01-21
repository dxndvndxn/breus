import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { APP_ROUTER } from './appRoutes';

export const AppRouting: React.FC = () => (
  <RouterProvider router={APP_ROUTER} />
);
