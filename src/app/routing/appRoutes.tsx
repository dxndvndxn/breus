import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { PORTFOLIOS_PATH, ROOT_PATH, ABOUT_PATH } from './appConstants';
import { Layout } from '../../common/components';
import App from '../App';

const Main = lazy(() => import('../../modules/main/Main'));
const Portfolios = lazy(
  () => import('../../modules/portfolios/PortfoliosPage')
);
const About = lazy(() => import('../../modules/about/About'));

export const APP_ROUTER = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<App />}>
      <Route
        path={ROOT_PATH}
        element={
          <Layout type="main">
            <Main />
          </Layout>
        }
      />
      <Route path={PORTFOLIOS_PATH} element={<Portfolios />} />
      <Route
        path={ABOUT_PATH}
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
    </Route>
  )
);
