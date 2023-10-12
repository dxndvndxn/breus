import { gsap } from 'gsap';
import { ImgSwitcher } from '../About';

export const enter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.from('.about-img', 1.8, { ease: 'power4.out', opacity: 0 }, 'start')
    .from('.about-content__text', 1.8, { ...animationConfig, y: 150 }, 'start')
    .from('.about-menu__btn', 1.8, { ...animationConfig, y: 70 }, 'start')
    .from(
      `#${ImgSwitcher.BRUCE}Displacement`,
      1.8,
      {
        ease: animationConfig.ease,
        attr: { scale: 150 },
      },
      'start'
    );
};

export const exit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.to('.about-img', 0.8, { ...animationConfig, opacity: 0 }, 'start')
    .to('.about-content__text', 0.8, { ...animationConfig, y: -150 }, 'start')
    .to('.about-menu__btn', 0.8, { ...animationConfig, y: -70 }, 'start')
    .to(
      '.displacement-image',
      0.8,
      {
        ...animationConfig,
        attr: { scale: 150 },
      },
      'start'
    );
};
