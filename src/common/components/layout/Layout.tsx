import React, { useLayoutEffect } from 'react';
import { Nav } from '../nav/Nav';
import { Link } from 'react-router-dom';
import './Layout.scss';
import { gsap } from 'gsap-trial';

interface ILayout {
  children: React.ReactNode;
  type?: 'main' | 'usual';
}

export const Layout: React.FC<ILayout> = ({ children, type = 'usual' }) => {
  const isMain = type === 'main';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const animationText = {
        ease: 'power4.out',
        delay: 0.1,
        skewY: 7,
        stagger: {
          amount: 0.3,
        },
      };

      tl.add('start')
        .from('.logo', 1.8, { ...animationText, y: 50 }, 'start')
        .from('.bottom', 1.8, { ...animationText, y: 120 }, 'start')
        .from('.navigation__item', 1.8, { ...animationText, y: 220 }, 'start');
    });

    return () => {
      ctx.revert();
    };
  }, []);

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
        {isMain && (
          <span className="bottom__text">
            Creative digital designer portfolio
          </span>
        )}
        {type === 'usual' && <Nav location="bottom" />}
      </div>
    </main>
  );
};
