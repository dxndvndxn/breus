import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { Main } from '../../modules/main/Main';
import { About } from '../../modules/about/About';
import { Contacts } from '../../modules/contacts/Contacts';
import { PortfoliosPage } from '../../modules/portfolios/PortfoliosPage';
import { ABOUT_PATH, CONTACTS_PATH, PORTFOLIOS_PATH } from './appConstants';
import type { RouteObject } from 'react-router-dom';
import { PageType } from '../../common/components/layout/Layout';
import { NotFound } from '../notFound/NotFound';
import App from '../App';

export enum PageName {
  MAIN = 'main',
  ABOUT = 'about',
  PORTFOLIOS = 'portfolios',
  CONTACTS = 'contacts',
  NOT_FOUND = 'not_found',
}
type AppRoutes = RouteObject & {
  name: PageName;
  layout?: PageType;
  reg?: string;
};

export const routes: AppRoutes[] = [
  {
    path: '*',
    element: <NotFound />,
    name: PageName.NOT_FOUND,
  },
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
    element: <PortfoliosPage />,
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
