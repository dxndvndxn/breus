import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Nav } from '../nav/Nav';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap-trial';
import './Layout.scss';

export type PageType = 'main' | 'usual';

interface ILayout {
  children: React.ReactNode;
  type?: PageType | undefined;
}

export const Layout: React.FC<ILayout> = ({ children, type = 'usual' }) => {
  const isMain = type === 'main';
  const { pathname } = useLocation();
  const cacheLocation = useRef(pathname);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const animationConfig = {
        ease: 'power4.out',
        delay: 0.1,
        skewY: 7,
        stagger: {
          amount: 0.3,
        },
      };

      if (isMain) {
        tl.add('start')
          .from('.logo', 1.8, { ...animationConfig, y: 50 }, 'start')
          .from('.bottom', 1.8, { ...animationConfig, y: 120 }, 'start')
          .from(
            '.navigation__item',
            1.8,
            { ...animationConfig, y: 220 },
            'start'
          )
          .from(
            '.pokemon-svg, .img-trail',
            0.8,
            {
              opacity: 0,
              y: 40,
            },
            'start'
          );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const leaveMain = cacheLocation.current === '/' && !isMain;
    cacheLocation.current = pathname;
    let ctx: gsap.Context;

    if (leaveMain) {
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [pathname, isMain]);

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
        {type === 'usual' && <Nav location="bottom" />}
      </div>
    </main>
  );
};
