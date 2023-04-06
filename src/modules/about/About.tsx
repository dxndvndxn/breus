import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDistortionEffect } from '../../common/hooks';
import PokemonImg from '../../assets/images/Pokemon.png';
import Breus from '../../assets/images/breus.webp';
import './About.scss';

enum ImgSwitcher {
  BRUCE = 'breus',
  POKEMON = 'pokemon',
}

const About: React.FC = () => {
  const [imgSwitch, setImgSwitch] = useState<ImgSwitcher>(ImgSwitcher.BRUCE);
  const [headMenu, setHeadMenu] = useState<HTMLElement | null>(null);
  const { scale, doDistortionEffect } = useDistortionEffect();

  useEffect(() => {
    setHeadMenu(document.getElementById('head-menu'));
  }, []);

  const switchImage = (img: ImgSwitcher) => {
    if (img === 'breus') {
      setImgSwitch(ImgSwitcher.BRUCE);
    }
    if (img === 'pokemon') {
      setImgSwitch(ImgSwitcher.POKEMON);
    }
    doDistortionEffect();
  };

  return (
    <div className="about">
      {headMenu &&
        createPortal(
          <div className="about__menu about-menu">
            <button
              className={`about-menu__btn ${
                imgSwitch === ImgSwitcher.POKEMON
                  ? 'about-menu__btn_active'
                  : ''
              }`}
              type="button"
              onClick={() => switchImage(ImgSwitcher.POKEMON)}
            >
              My soulmate
            </button>
            <button
              className={`about-menu__btn ${
                imgSwitch === ImgSwitcher.BRUCE ? 'about-menu__btn_active' : ''
              }`}
              type="button"
              onClick={() => switchImage(ImgSwitcher.BRUCE)}
            >
              Me
            </button>
          </div>,
          headMenu
        )}
      <div className="about__img about-img">
        <svg
          className={`distort img__breus ${
            imgSwitch === ImgSwitcher.POKEMON
              ? 'about-img__pokemon'
              : 'about-img__breus'
          }`}
        >
          <filter id="distortionFilter">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.07 0.01"
              numOctaves="5"
              seed="2"
              stitchTiles="stitch"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="B"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              filterUnits="userSpaceOnUse"
            />
          </filter>
          <g filter="url(#distortionFilter)">
            <image
              className={`distort__img about-img__breus ${
                imgSwitch !== 'breus' && 'distort__img_opacity'
              }`}
              x="24"
              y="13"
              xlinkHref={Breus}
            />
            <image
              className={`distort__img about-img__pokemon ${
                imgSwitch !== 'pokemon' && 'distort__img_opacity'
              }`}
              x="-100"
              xlinkHref={PokemonImg}
            />
          </g>
        </svg>
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
