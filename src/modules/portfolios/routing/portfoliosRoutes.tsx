import React from 'react';
import { RouteProps } from 'react-router/dist/lib/components';
import { PORTFOLIO_PATH, PORTFOLIOS_PATH } from './portfoliosConstants';
import { Portfolios } from '../components/portfolios/Portfolios';
import { PortfolioPage } from '../../portfolio/PortfolioPage';

export const PORTFOLIOS_ROUTES: RouteProps[] = [
  {
    path: PORTFOLIOS_PATH,
    element: <Portfolios />,
  },
  {
    path: PORTFOLIO_PATH,
    element: <PortfolioPage />,
  },
];
