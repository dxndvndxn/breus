import React, { memo } from 'react';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import './Layout.scss';
import { useTransitionAnimation } from '../../hooks/useTransitionAnimation';
import { PageName } from '../../../app/routing/appRoutes';
import type { TransitionStatus } from 'react-transition-group';

export type PageType = 'main' | 'usual';

interface ILayout {
  children: React.ReactNode;
  name: PageName;
  status: TransitionStatus;
  disableAnimation: boolean;
  layout?: PageType | undefined;
}

export const Layout: React.FC<ILayout> = memo(
  ({ children, name, status, disableAnimation, layout = 'usual' }) => {
    const isMain = layout === 'main';

    useTransitionAnimation(name, status, disableAnimation);

    return (
      <main className="layout">
        <div className="layout__head blended-mode">
          <div />
          <Link className="logo" to={'/'}>
            Sergey Breus
          </Link>

          <div id="head-menu" />
        </div>

        {children}

        {isMain && (
          <header className="header header_center blended-mode">
            <Nav location="center" />
          </header>
        )}

        <div className="layout__bottom bottom blended-mode">
          {isMain && 'Creative digital designer portfolio'}
          {layout === 'usual' && <Nav location="bottom" />}
        </div>
      </main>
    );
  }
);
