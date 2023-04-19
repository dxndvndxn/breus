import React, { useEffect, useState } from 'react';
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

export const Layout: React.FC<ILayout> = ({
  children,
  name,
  status,
  disableAnimation,
  layout = 'usual',
}) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const isMain = layout === 'main';

  useTransitionAnimation(name, status, disableAnimation);

  const wheelEvent = (e: WheelEvent) => {
    const delta = Math.sign(e.deltaY);

    if (delta > 0 && window.pageYOffset > 0) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', wheelEvent);

    return () => {
      window.removeEventListener('wheel', wheelEvent);
    };
  }, []);

  return (
    <main className="layout">
      <div
        className={`layout__head blended-mode ${
          scrollDirection === 'down' ? 'layout__head_hide' : ''
        }`}
      >
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
};
