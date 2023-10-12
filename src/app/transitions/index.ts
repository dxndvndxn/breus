import { gsap } from 'gsap';

export const enter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    delay: 0.1,
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.from(
    '.not-found__word',
    1.8,
    {
      ...animationConfig,
      y: 270,
    },
    'start'
  );
};

export const exit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    skewY: -7,
  };

  tl.to(
    '.not-found__word',
    {
      ...animationConfig,
      duration: 2,
      y: -270,
    },
    'start'
  );
};
