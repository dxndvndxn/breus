import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

import PokemonImg from '../../assets/images/Pokemon.png';
import Breus from '../../assets/images/breus.webp';
import './About.scss';
import { windowWidth } from '../../common/helpers';
import { gsap } from 'gsap';

enum ImgSwitcher {
  BRUCE = 'breus',
  POKEMON = 'pokemon',
}

export const About: React.FC = () => {
  const [imgSwitch, setImgSwitch] = useState<ImgSwitcher>(ImgSwitcher.BRUCE);
  const isDesktop = windowWidth > 991;

  const tabAnimation = (appear: ImgSwitcher, disappear: ImgSwitcher) => {
    const whatAppear = `.${appear}`;
    const whatDisappear = `.${disappear}`;
    const duration = 1.7;
    const animationSettings = {
      ease: 'power4.out',
      duration,
    };

    const tlInit = gsap.timeline();

    tlInit
      .add('start')
      .to(whatAppear, { ...animationSettings, autoAlpha: 1 }, 'start')
      .to(
        whatDisappear,
        {
          ...animationSettings,
          autoAlpha: 0,
        },
        'start'
      )
      .fromTo(
        '#tabDisplacement',
        {
          ...animationSettings,
          attr: { scale: 100 },
        },
        {
          ...animationSettings,
          attr: { scale: 0 },
        },
        'start'
      );
  };

  const switchImage = (appear: ImgSwitcher) => {
    const disappear =
      appear === ImgSwitcher.BRUCE ? ImgSwitcher.POKEMON : ImgSwitcher.BRUCE;
    setImgSwitch(appear);
    tabAnimation(appear, disappear);
  };

  useEffect(() => {
    // tabAnimation(ImgSwitcher.BRUCE, ImgSwitcher.POKEMON);
  }, []);

  const ImgAbout = useMemo(() => {
    if (isDesktop) {
      return (
        <>
          <svg
            style={{ opacity: 0 }}
            className={`distort img__breus about-img__pokemon ${ImgSwitcher.POKEMON}`}
          >
            <filter id="distortionFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.01"
                numOctaves="10"
                stitchTiles="stitch"
                seed="15"
              />
              <feDisplacementMap
                id="tabDisplacement"
                in="SourceGraphic"
                xChannelSelector="R"
                yChannelSelector="R"
                filterUnits="userSpaceOnUse"
              />
            </filter>
            <g filter="url(#distortionFilter)">
              <image
                className={`distort__img about-img__pokemon`}
                x="-158"
                xlinkHref={PokemonImg}
              />
            </g>
          </svg>
          <svg
            className={`distort img__breus about-img__breus ${ImgSwitcher.BRUCE}`}
          >
            <filter id="distortionFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.01"
                numOctaves="10"
                stitchTiles="stitch"
                seed="15"
              />
              <feDisplacementMap
                id="tabDisplacement"
                in="SourceGraphic"
                xChannelSelector="R"
                yChannelSelector="R"
                filterUnits="userSpaceOnUse"
              />
            </filter>
            <g filter="url(#distortionFilter)">
              <image
                className={`distort__img about-img__breus`}
                x="-30"
                y="0"
                xlinkHref={Breus}
              />
            </g>
          </svg>
        </>
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
  }, [imgSwitch]);

  return (
    <div className="about">
      <div className="about__img about-img">{ImgAbout}</div>

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
          <div className="about-content__text">
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
