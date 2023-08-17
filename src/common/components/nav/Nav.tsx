import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ABOUT_PATH,
  CONTACTS_PATH,
  PORTFOLIOS,
} from '../../../app/routing/appConstants';
import './Nav.scss';
import { useAppSelector } from '../../store';

interface INav {
  location: 'center' | 'bottom';
}

export const Nav: React.FC<INav> = ({ location }) => {
  const { count } = useAppSelector((state) => state.portfoliosReducer);

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
    <nav className={`nav ${location}`}>
      <ul className="navigation">
        <li className="navigation__item">
          <NavLink
            className={detectActive('navigation__link_first')}
            to={`/${PORTFOLIOS}`}
          >
            <span className="nav-link__text">Works</span>
            <span className="nav-link__divider">&#47;</span>
            <span className="nav-link__counts">{count}</span>
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className={detectActive()} to={`/${ABOUT_PATH}`}>
            <span className="nav-link__text">About me</span>
            <span className="nav-link__divider">&#47;</span>
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink className={detectActive()} to={`/${CONTACTS_PATH}`}>
            <span className="nav-link__text">Contact</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
