import React from 'react';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import './Layout.scss';

interface ILayout {
  children: React.ReactNode;
  type?: 'main' | 'usual';
}

export const Layout: React.FC<ILayout> = ({ children, type = 'usual' }) => {
  const isMain = type === 'main';
  return (
    <main className="layout">
      <div className="layout__head blended-mode">
        <Link className="logo" to={'/'}>
          Sergey Breus
        </Link>
      </div>

      {children}

      {isMain && (
        <header className="header header_center blended-mode">
          <Nav location="center" />
        </header>
      )}

      {isMain && (
        <div className="layout__bottom blended-mode">
          Creative digital designer portfolio
        </div>
      )}
      {type === 'usual' && (
        <div className="layout__bottom blended-mode">
          <Nav location="bottom" />
        </div>
      )}
    </main>
  );
};
