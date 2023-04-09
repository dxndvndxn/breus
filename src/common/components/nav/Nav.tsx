import React, { useCallback } from 'react';
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
    <nav className={location}>
      <ul className="navigation">
        <li>
          <NavLink
            className={detectActive('navigation__link_first')}
            to={`/${PORTFOLIOS}`}
          >
            Works
            <span className="nav-link__counts">34</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={detectActive()} to={`/${ABOUT_PATH}`}>
            About me
          </NavLink>
        </li>
        <li>
          <NavLink
            className={detectActive('navigation__link_last link-hover')}
            to={`/${CONTACTS_PATH}`}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
