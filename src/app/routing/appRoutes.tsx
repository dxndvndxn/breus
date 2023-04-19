import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ABOUT_PATH, CONTACTS_PATH, PORTFOLIOS_PATH } from './appConstants';
import type { RouteObject } from 'react-router-dom';
import { PageType } from '../../common/components/layout/Layout';
import App from '../App';

const Main = lazy(() => import('../../modules/main/Main'));
const Portfolios = lazy(
  () => import('../../modules/portfolios/PortfoliosPage')
);
const About = lazy(() => import('../../modules/about/About'));
const Contacts = lazy(() => import('../../modules/contacts/Contacts'));

export enum PageName {
  MAIN = 'main',
  ABOUT = 'about',
  PORTFOLIOS = 'portfolios',
  CONTACTS = 'contacts',
}
type AppRoutes = RouteObject & {
  name: PageName;
  layout?: PageType;
  reg?: string;
};

export const routes: AppRoutes[] = [
  {
    path: '/',
    element: <Main />,
    layout: 'main',
    name: PageName.MAIN,
  },
  {
    path: `/${ABOUT_PATH}`,
    element: <About />,
    name: PageName.ABOUT,
  },
  {
    path: `/${PORTFOLIOS_PATH}`,
    element: <Portfolios />,
    name: PageName.PORTFOLIOS,
    reg: `[\/*]+$`,
  },
  {
    path: `/${CONTACTS_PATH}`,
    element: <Contacts />,
    name: PageName.CONTACTS,
  },
];

export const APP_ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);
