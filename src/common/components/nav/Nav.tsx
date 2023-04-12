import React, { useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ABOUT_PATH,
  CONTACTS_PATH,
  PORTFOLIOS,
} from '../../../app/routing/appConstants';
import './Nav.scss';

interface INav {
  location: 'center' | 'bottom';
}

export const Nav: React.FC<INav> = ({ location }) => {
  const nav = useRef<HTMLDivElement>(null);

  const detectActive = useCallback(
    (addedClass = '') =>
      ({ isActive }: { isActive: boolean; isPending: boolean }): string => {
        const classDefault = `navigation__link ${addedClass}`;
        return isActive
          ? `${classDefault} navigation__link_active`
          : classDefault;
      },
    []
  );

  return (
    <nav className={`nav ${location}`} ref={nav}>
      <ul className="navigation">
        <li className="navigation__item">
          <NavLink
            className={detectActive('navigation__link_first')}
            to={`/${PORTFOLIOS}`}
          >
            Works
            <span className="nav-link__counts">34</span>
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className={detectActive()} to={`/${ABOUT_PATH}`}>
            About me
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            className={detectActive('navigation__link_last')}
            to={`/${CONTACTS_PATH}`}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
