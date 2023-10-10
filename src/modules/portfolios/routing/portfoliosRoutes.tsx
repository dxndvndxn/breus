import { RouteProps } from 'react-router/dist/lib/components';
import { PORTFOLIOS_PATH } from './portfoliosConstants';
import { Portfolios } from '../components/portfolios/Portfolios';

export const PORTFOLIOS_ROUTES: RouteProps[] = [
  {
    path: PORTFOLIOS_PATH,
    element: <Portfolios />,
  },
];
