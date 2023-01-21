import React from 'react';
import { PORTFOLIOS_ROUTES } from './portfoliosRoutes';
import { Route, Routes } from 'react-router-dom';

export const PortfoliosRouting: React.FC = () => (
  <Routes>
    {PORTFOLIOS_ROUTES.map((route) => (
      <Route {...route} />
    ))}
  </Routes>
);
