import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import './About.scss';

const About: React.FC = () => {
  const [imgSwitcher] = useState<'breus' | 'pokemon'>('breus');
  const [headMenu, setHeadMenu] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setHeadMenu(document.getElementById('head-menu'));
  }, []);

  return (
    <div className="about">
      {headMenu &&
        createPortal(
          <div className="about__menu about-menu">
            <button
              className="about-menu__btn about-menu__btn_active"
              type="button"
            >
              My soulmate
            </button>
            <button className="about-menu__btn" type="button">
              Me
            </button>
          </div>,
          headMenu
        )}
      <div className="about__img about-img">
        <div className={`about-img__${imgSwitcher}`} />
      </div>

      <div className="about__content about-content">
        <div className="about-content__text about-content_first">
          Independent creative designer
          <div className="about-content_grey">Sergey Breus</div>
        </div>

        <div className="about-content__text">
          My profile is the creation of effective and comprehensive solutions
          for your business.
        </div>

        <div className="about-content__text about-content_purpp">
          Webdesign &#47; Creative concept &#47; Identity &#47; Branding &#47;
          Campaigns
        </div>
      </div>
    </div>
  );
};

export default About;
