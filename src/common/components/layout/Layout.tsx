import React, { useEffect, useState } from 'react';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import './Layout.scss';
import { useTransitionAnimation } from '../../hooks/useTransitionAnimation';
import { PageName } from '../../../app/routing/appRoutes';
import type { TransitionStatus } from 'react-transition-group';
import { useAppDispatch } from '../../store';
import { fetchPortfolios } from '../../../modules/portfolios/PortfoliosSlice';

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
  const dispatch = useAppDispatch();
  const isMain = layout === 'main';
  const disable = status === 'entering' || status === 'exiting';

  useTransitionAnimation(name, status, disableAnimation);

  const wheelEvent = (e: WheelEvent) => {
    const delta = Math.sign(e.deltaY);

    if (delta > 0) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', wheelEvent);
    dispatch(fetchPortfolios(0));

    return () => {
      window.removeEventListener('wheel', wheelEvent);
    };
  }, []);

  return (
    <main className={`layout ${layout}${disable ? ' layout_disabled' : ''}`}>
      <div
        className={`layout__head blended-mode ${
          scrollDirection === 'down' ? 'layout__head_hide' : ''
        }`}
      >
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
