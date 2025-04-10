import { createBrowserRouter } from 'react-router-dom';
import { Main } from '../../modules/main/Main';
import { About } from '../../modules/about/About';
import { Contacts } from '../../modules/contacts/Contacts';
import { PortfoliosPage } from '../../modules/portfolios/PortfoliosPage';
import { ABOUT_PATH, CONTACTS_PATH, PORTFOLIOS_PATH } from './appConstants';
import type { RouteObject } from 'react-router-dom';
import { PageType } from '../../common/components/layout/Layout';
import { NotFound } from '../notFound/NotFound';
import App from '../App';
const titleTemplate = 'Sergey Breus';
export enum PageName {
  MAIN = 'Main',
  ABOUT = 'About',
  PORTFOLIOS = 'Portfolios',
  CONTACTS = 'Contacts',
  NOT_FOUND = 'Nøt Føund',
}
type AppRoutes = RouteObject & {
  name: PageName;
  title: string;
  layout?: PageType;
  reg?: string;
};

export const routes: AppRoutes[] = [
  {
    path: '*',
    element: <NotFound />,
    name: PageName.NOT_FOUND,
    title: PageName.NOT_FOUND,
  },
  {
    path: '/',
    element: <Main />,
    layout: 'main',
    name: PageName.MAIN,
    title: `${titleTemplate}`,
  },
  {
    path: `/${ABOUT_PATH}`,
    element: <About />,
    name: PageName.ABOUT,
    title: `${titleTemplate} — ${PageName.ABOUT}`,
  },
  {
    path: `/${PORTFOLIOS_PATH}`,
    element: <PortfoliosPage />,
    name: PageName.PORTFOLIOS,
    reg: `[\/*]+$`,
    title: `${titleTemplate} — ${PageName.PORTFOLIOS}`,
  },
  {
    path: `/${CONTACTS_PATH}`,
    element: <Contacts />,
    name: PageName.CONTACTS,
    title: `${titleTemplate} — ${PageName.CONTACTS}`,
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
