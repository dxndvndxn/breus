import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { PORTFOLIOS_PATH, ROOT_PATH } from './appConstants';
import App from '../App';

const Main = lazy(() => import('../../modules/main/MainPage'));
const Portfolios = lazy(
  () => import('../../modules/portfolios/PortfoliosPage')
);

export const APP_ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<App />}>
      <Route path={ROOT_PATH} element={<Main />} />
      <Route path={PORTFOLIOS_PATH} element={<Portfolios />} />
    </Route>
  )
);
