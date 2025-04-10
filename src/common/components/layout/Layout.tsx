import React, { useEffect } from 'react';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import './Layout.scss';
import { useTransitionAnimation } from '../../hooks';
import { appActions } from '../../../app/AppSlice';
import { PageName } from '../../../app/routing/appRoutes';
import type { TransitionStatus } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPortfolios } from '../../../modules/portfolios/PortfoliosSlice';

export type PageType = 'main' | 'usual';

interface ILayout {
  children: React.ReactNode;
  name: PageName;
  status: TransitionStatus;
  disableAnimation: boolean;
  title?: string;
  layout?: PageType | undefined;
}

export const Layout: React.FC<ILayout> = ({
  children,
  name,
  status,
  disableAnimation,
  layout = 'usual',
  title = PageName.NOT_FOUND,
}) => {
  const dispatch = useAppDispatch();
  const { portfolios } = useAppSelector((state) => state.portfoliosReducer);
  const { setFirstLoad } = appActions;
  const isMain = layout === 'main';
  const disable = status === 'entering' || status === 'exiting';

  useTransitionAnimation(name, status, disableAnimation);

  useEffect(() => {
    if (!portfolios.length) {
      dispatch(fetchPortfolios(0));
    }
  }, []);

  useEffect(() => {
    if (document) document.title = title;
  }, [title]);

  useEffect(() => {
    dispatch(setFirstLoad(!disableAnimation));
  }, [disableAnimation]);

  return (
    <main className={`layout ${layout}${disable ? ' layout_disabled' : ''}`}>
      <div className={`layout__head blended-mode`}>
        <div />
        <Link className="logo" to={'/'}>
          Sergey Breus
        </Link>
      </div>

      {children}

      <header className={`header blended-mode`}>
        <Nav />
      </header>

      {isMain && (
        <div className="layout__bottom bottom blended-mode">
          Creative digital designer portfolio
        </div>
      )}
    </main>
  );
};
