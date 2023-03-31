import React from 'react';
import { Link } from 'react-router-dom';
import { portfolios } from '../../../app/routing/appConstants';
import './Nav.scss';

interface INav {
  location: 'center' | 'bottom';
}

export const Nav: React.FC<INav> = ({ location }) => (
  <nav className={location}>
    <ul className="navigation">
      <li>
        <Link className="navigation__link nav-link" to={portfolios}>
          Works
          <span className="nav-link__counts">34</span>
        </Link>
      </li>
      <li>
        <Link className="navigation__link" to={'/about'}>
          About
        </Link>
      </li>
      <li>
        <Link
          className="navigation__link navigation__link_last"
          to={'/contact'}
        >
          Contact
        </Link>
      </li>
    </ul>
  </nav>
);
