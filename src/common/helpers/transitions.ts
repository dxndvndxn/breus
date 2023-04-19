import { gsap } from 'gsap-trial';

export const mainPageEnter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    delay: 0.1,
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.add('start')
    .from('.logo', 1.8, { ...animationConfig, y: 50 }, 'start')
    .from('.bottom', 1.8, { ...animationConfig, y: 120 }, 'start')
    .from('.navigation__item', 1.8, { ...animationConfig, y: 220 }, 'start')
    .from(
      '.pokemon-svg, .img-trail',
      0.8,
      {
        opacity: 0,
        y: 40,
      },
      'start'
    );
};

export const mainPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.add('start')
    .to('.logo', 0.7, { ...animationConfig, y: -50 }, 'start')
    .to('.bottom', 0.7, { ...animationConfig, y: 120 }, 'start')
    .to(
      '.navigation__item',
      0.7,
      {
        ...animationConfig,
        y: -120,
      },
      'start'
    )
    .to(
      '.pokemon-svg, .img-trail',
      0.7,
      {
        opacity: 0,
      },
      'start'
    );
};

export const usualPageEnter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    delay: 0.1,
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.add('start')
    .from('.logo', 1.8, { ...animationConfig, y: 50 }, 'start')
    .from('.bottom', 1.8, { ...animationConfig, y: 50 }, 'start');
};

export const usualPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.add('start')
    .to('.logo', 0.7, { ...animationConfig, y: -50 }, 'start')
    .to('.bottom', 0.7, { ...animationConfig, y: 50 }, 'start');
};

export const aboutPageEnter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.from('.about-img', 1.8, { ease: 'power4.out', opacity: 0 }, 'start').from(
    '.about-content__text',
    1.8,
    { ...animationConfig, y: 150 },
    'start'
  );
};

export const aboutPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.to('.about-img', 0.8, { ...animationConfig, opacity: 0 }, 'start').to(
    '.about-content__text',
    0.8,
    { ...animationConfig, y: -150 },
    'start'
  );
};

export const contactsPageEnter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    delay: 0.1,
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.from(
    '.contacts__title, .socials__link',
    1.8,
    {
      ...animationConfig,
      y: 150,
    },
    'start'
  ).from(
    '.contacts__mail',
    1.8,
    { ease: 'power4.out', delay: 0.1, y: 150 },
    'start'
  );
};

export const contactsPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.to(
    '.contacts__title, .socials__link',
    0.8,
    {
      ...animationConfig,
      y: -150,
    },
    'start'
  ).to('.contacts__mail', 0.8, { ...animationConfig, y: -150 }, 'start');
};

export const portfoliosPageEnter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.from(
    '.entering__text',
    1.8,
    {
      ...animationConfig,
      y: 150,
    },
    'start'
  )
    .to(
      '.entering',
      0.9,
      {
        ease: 'liner',
        y: -150,
        opacity: 0,
      },
      '-=0.8'
    )
    .from(
      '.portfolios',
      1,
      {
        ease: 'circ.easeOut',
        top: '100vh',
        position: 'absolute',
      },
      '-=0.9'
    );
};
