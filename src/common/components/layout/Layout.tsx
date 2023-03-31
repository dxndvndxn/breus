import React from 'react';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import './Layout.scss';

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => (
  <main className="layout">
    <div className="layout__head blended-mode">
      <Link className="logo" to={'/'}>
        Sergey Breus
      </Link>
    </div>
    {children}

    <header className="header header_center blended-mode">
      <Nav location="center" />
    </header>

    <div className="layout__bottom blended-mode">
      Creative digital designer portfolio
    </div>
  </main>
);
