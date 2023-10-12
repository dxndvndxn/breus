import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import PokemonImg from '../../assets/images/Pokemon.png';
import Breus from '../../assets/images/breus.webp';
import './About.scss';
import { windowWidth } from '../../common/helpers';
import { gsap } from 'gsap';

export enum ImgSwitcher {
  BRUCE = 'breus',
  POKEMON = 'pokemon',
}

export const About: React.FC = () => {
  const [imgSwitch, setImgSwitch] = useState<ImgSwitcher>(ImgSwitcher.BRUCE);
  const isDesktop = windowWidth > 991;
  const breusPos = {
    x: isDesktop ? -30 : -20,
    y: 0,
  };
  const breusSvg = !isDesktop
    ? {
        viewBox: '0 0 130 300',
      }
    : {};
  const pokemonPos = {
    x: isDesktop ? -158 : 0,
    y: 0,
  };

  const tabAnimation = (appear: ImgSwitcher, disappear: ImgSwitcher) => {
    const whatAppear = `.${appear}`;
    const whatDisappear = `.${disappear}`;
    const scaleDisappear = `#${disappear}Displacement`;
    const scaleAppear = `#${appear}Displacement`;
    const duration = 1;
    const animationSettings = {
      duration,
    };

    if (!isDesktop) {
      animationSettings.duration = 1.5;
    }

    const tlInit = gsap.timeline();

    tlInit
      .add('start')
      .fromTo(
        scaleDisappear,
        {
          ...animationSettings,
          attr: { scale: 0 },
        },
        {
          ...animationSettings,
          attr: { scale: 150 },
          clearProps: 'all',
        },
        'start'
      )
      .to(
        whatDisappear,
        {
          ...animationSettings,
          autoAlpha: 0,
        },
        'start'
      )
      .fromTo(
        scaleAppear,
        {
          ...animationSettings,
          attr: { scale: 150 },
        },
        {
          ...animationSettings,
          attr: { scale: 0 },
        },
        'start'
      )
      .to(whatAppear, { ...animationSettings, autoAlpha: 1 }, 'start');
  };

  const switchImage = (appear: ImgSwitcher) => {
    const disappear =
      appear === ImgSwitcher.BRUCE ? ImgSwitcher.POKEMON : ImgSwitcher.BRUCE;
    setImgSwitch(appear);
    tabAnimation(appear, disappear);
  };

  return (
    <div className="about">
      <div className="about__img about-img">
        <svg
          style={{ opacity: 0 }}
          className={`distort about-img__pokemon ${ImgSwitcher.POKEMON}`}
        >
          <filter id="pokemonFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.01"
              numOctaves="10"
              stitchTiles="stitch"
              seed="15"
            />
            <feDisplacementMap
              id={`${ImgSwitcher.POKEMON}Displacement`}
              className="displacement-image"
              in="SourceGraphic"
              xChannelSelector="R"
              yChannelSelector="R"
              filterUnits="userSpaceOnUse"
            />
          </filter>
          <g filter="url(#pokemonFilter)">
            <image
              className={`distort__img about-img__pokemon`}
              {...pokemonPos}
              xlinkHref={PokemonImg}
            />
          </g>
        </svg>
        <svg
          className={`distort about-img__breus ${ImgSwitcher.BRUCE}`}
          {...breusSvg}
        >
          <filter id="bruceFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.01"
              numOctaves="10"
              stitchTiles="stitch"
              seed="15"
            />
            <feDisplacementMap
              id={`${ImgSwitcher.BRUCE}Displacement`}
              className="displacement-image"
              in="SourceGraphic"
              xChannelSelector="R"
              yChannelSelector="R"
              filterUnits="userSpaceOnUse"
            />
          </filter>
          <g filter="url(#bruceFilter)">
            <image
              className={`distort__img about-img__breus`}
              xlinkHref={Breus}
              {...breusPos}
            />
          </g>
        </svg>
      </div>

      <div className="about__content about-content">
        <div className="about__menu about-menu">
          <NavLink
            to="/about#"
            className={`about-menu__btn ${
              imgSwitch === ImgSwitcher.BRUCE ? 'about-menu__btn_active' : ''
            }`}
            onClick={() => switchImage(ImgSwitcher.BRUCE)}
          >
            Me
          </NavLink>
          <NavLink
            to="/about#"
            className={`about-menu__btn ${
              imgSwitch === ImgSwitcher.POKEMON ? 'about-menu__btn_active' : ''
            }`}
            onClick={() => switchImage(ImgSwitcher.POKEMON)}
          >
            My soulmate
          </NavLink>
        </div>

        <div className="about-content__wrap">
          <div className="about-content__text about-content_first">
            Independent creative designer
            <div className="about-content_grey">Sergey Breus</div>
          </div>
        </div>

        <div className="about-content__wrap">
          <div className="about-content__text about-content_sec">
            My profile is the creation of effective and comprehensive solutions
            for your business.
          </div>
        </div>
        <div className="about-content__wrap">
          <div className="about-content__text about-content_purpp about-content_third">
            Webdesign &#47; Creative concept &#47; Identity &#47; Branding &#47;
            Campaigns
          </div>
        </div>
      </div>
    </div>
  );
};
