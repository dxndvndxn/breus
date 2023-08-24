import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDistortionEffect } from '../../common/hooks';
import PokemonImg from '../../assets/images/Pokemon.png';
import Breus from '../../assets/images/breus.webp';
import './About.scss';
import { windowWidth } from '../../common/helpers';

enum ImgSwitcher {
  BRUCE = 'breus',
  POKEMON = 'pokemon',
}

export const About: React.FC = () => {
  const [imgSwitch, setImgSwitch] = useState<ImgSwitcher>(ImgSwitcher.POKEMON);
  const { scale, doDistortionEffect } = useDistortionEffect();
  const isDesktop = windowWidth > 991;

  const switchImage = (img: ImgSwitcher) => {
    if (img === 'breus') {
      setImgSwitch(ImgSwitcher.BRUCE);
    }
    if (img === 'pokemon') {
      setImgSwitch(ImgSwitcher.POKEMON);
    }
    if (isDesktop) {
      doDistortionEffect(100);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      doDistortionEffect(150);
    }
  }, []);

  const ImgAbout = useMemo(() => {
    if (isDesktop) {
      return (
        <svg
          className={`distort img__breus ${
            imgSwitch === ImgSwitcher.POKEMON
              ? 'about-img__pokemon'
              : 'about-img__breus'
          }`}
        >
          <filter id="distortionFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.01"
              result="noise"
              numOctaves="10"
              stitchTiles="stitch"
              seed="15"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="R"
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
      );
    }

    return (
      <>
        <img
          className={`distort__img about-img__breus ${
            imgSwitch !== 'breus' && 'distort__img_opacity'
          }`}
          src={Breus}
          alt="Breus"
        />
        <img
          className={`distort__img about-img__pokemon ${
            imgSwitch !== 'pokemon' && 'distort__img_opacity'
          }`}
          src={PokemonImg}
          alt="Pokemon"
        />
      </>
    );
  }, [imgSwitch, scale]);

  return (
    <div className="about">
      <div className="about__img about-img">{ImgAbout}</div>

      <div className="about__content about-content">
        <div className="about__menu about-menu">
          <NavLink
            to="/about#"
            className={`about-menu__btn ${
              imgSwitch === ImgSwitcher.POKEMON ? 'about-menu__btn_active' : ''
            }`}
            onClick={() => switchImage(ImgSwitcher.POKEMON)}
          >
            My soulmate
          </NavLink>
          <NavLink
            to="/about#"
            className={`about-menu__btn ${
              imgSwitch === ImgSwitcher.BRUCE ? 'about-menu__btn_active' : ''
            }`}
            onClick={() => switchImage(ImgSwitcher.BRUCE)}
          >
            Me
          </NavLink>
        </div>

        <div className="about-content__wrap">
          <div className="about-content__text about-content_first">
            Independent creative designer
            <div className="about-content_grey">Sergey Breus</div>
          </div>
        </div>

        <div className="about-content__wrap">
          <div className="about-content__text">
            My profile is the creation of effective and comprehensive solutions
            for your business.
          </div>
        </div>
        <div className="about-content__wrap">
          <div className="about-content__text about-content_purpp">
            Webdesign &#47; Creative concept &#47; Identity &#47; Branding &#47;
            Campaigns
          </div>
        </div>
      </div>
    </div>
  );
};
