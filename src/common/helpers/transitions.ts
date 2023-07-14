import { gsap } from 'gsap';

export const mainPageEnter = (tl: gsap.core.Timeline, isFirstLoad = true) => {
  if (isFirstLoad) {
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
  } else {
    const animationConfig = {
      ease: 'power3.out',
    };
    const smoothTime = 1.24;

    tl.add('start')
      .from(
        '.header',
        smoothTime,
        {
          ...animationConfig,
          top: 'calc(100% - 3.9rem)',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.nav',
        smoothTime,
        {
          ...animationConfig,
          fontSize: '2.7rem',
          height: 'auto',
          width: 'auto',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.navigation',
        smoothTime,
        {
          ...animationConfig,
          gap: '0 5.1rem',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.navigation__link',
        smoothTime,
        {
          ...animationConfig,
          fontSize: '2.7rem',
          top: 'auto',
          right: 'auto',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.nav-link__divider',
        smoothTime,
        {
          ...animationConfig,
          right: '-6rem',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.navigation__link.navigation__link_first ',
        smoothTime,
        {
          ...animationConfig,
          marginRight: '1rem',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.navigation__link.navigation__link_first .nav-link__divider',
        smoothTime,
        {
          ...animationConfig,
          right: '-4rem',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.nav-link__counts',
        smoothTime,
        {
          ...animationConfig,
          transform: 'translateX(0.5rem)',
          fontSize: '1.2rem',
          clearProps: 'all',
        },
        'start'
      )
      .from(
        '.bottom',
        1.8,
        { ...animationConfig, y: 120, clearProps: 'all' },
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
};

export const mainPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power3.out',
  };
  const smoothTime = 1.24;

  tl.add('start')
    .to('.bottom', 0.7, { ...animationConfig, y: 120 }, 'start')
    .to(
      '.header',
      smoothTime,
      {
        ...animationConfig,
        top: 'calc(100% - 3.9rem)',
      },
      'start'
    )
    .to(
      '.nav',
      smoothTime,
      {
        ...animationConfig,
        fontSize: '2.7rem',
        height: 'auto',
        width: 'auto',
      },
      'start'
    )
    .to(
      '.navigation',
      smoothTime,
      {
        ...animationConfig,
        gap: '0 5.1rem',
      },
      'start'
    )
    .to(
      '.navigation__link',
      smoothTime,
      {
        ...animationConfig,
        fontSize: '2.7rem',
        top: 'auto',
        right: 'auto',
      },
      'start'
    )
    .to(
      '.nav-link__divider',
      smoothTime,
      {
        ...animationConfig,
        right: '-3rem',
      },
      'start'
    )
    .to(
      '.navigation__link.navigation__link_first ',
      smoothTime,
      {
        ...animationConfig,
        marginRight: '1rem',
      },
      'start'
    )
    .to(
      '.navigation__link.navigation__link_first .nav-link__divider',
      smoothTime,
      {
        ...animationConfig,
        right: '-4rem',
      },
      'start'
    )
    .to(
      '.nav-link__counts',
      smoothTime,
      {
        ...animationConfig,
        transform: 'translateX(0.5rem)',
        fontSize: '1.2rem',
      },
      'start'
    )
    .to(
      '.pokemon-svg, .img-trail',
      smoothTime,
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
  // .from('.about__menu', { ...animationConfig, y: 150 });
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
      opacity: 0,
    },
    'start'
  )
    .from(
      '.percent',
      1.8,
      {
        ...animationConfig,
        y: 100,
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
        onComplete: () => {
          document.querySelector<HTMLElement>('.entering')!.style.display =
            'none';
        },
      },
      '-=0.8'
    )
    .from(
      '.portfolios',
      1,
      {
        ease: 'circ.easeOut',
        position: 'absolute',
        y: '100%',
      },
      '-=0.9'
    );
};

export const portfoliosPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.to(
    '.percent',
    0.8,
    {
      ...animationConfig,
      y: -100,
    },
    'start'
  ).to(
    '.portfolio',
    1,
    {
      ease: 'power4.in',
      '--portfolio-width': '100%',
    },
    'start'
  );
};
