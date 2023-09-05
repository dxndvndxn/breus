import { gsap } from 'gsap';
import { windowWidth } from './constants';
const isMobile = windowWidth < 991;

export const mainPageEnter = (tl: gsap.core.Timeline, isFirstLoad = true) => {
  const onComplete = () => {
    setTimeout(() => {
      document
        .querySelector<HTMLElement>('.pokemon-svg')!
        .classList.add('pokemon-svg_none');
    });
    const trails = document.querySelectorAll('.img-trail');

    trails.forEach((trail) => {
      console.log(trail);
      trail.classList.remove('pokemon-svg_none');
    });
  };

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
      .from(
        '.logo',
        1.8,
        { ...animationConfig, y: 50, force3D: false },
        'start'
      )
      .from(
        '.bottom',
        1.8,
        { ...animationConfig, y: 120, force3D: false },
        'start'
      )
      .from(
        '.navigation__item',
        1.8,
        { ...animationConfig, y: 220, force3D: false },
        'start'
      )
      .from(
        '.pokemon-svg-wrap',
        0.8,
        {
          opacity: 0,
          y: 40,
          force3D: false,
        },
        'start'
      )
      .from(
        '#pokemonDisplacement',
        1.8,
        {
          attr: { scale: 170 },
          force3D: false,
          onComplete,
        },
        'start'
      );
  } else {
    const animationConfig = {
      ease: 'power3.out',
      force3D: false,
    };
    const smoothTime = 1.24;
    const linkDivider: any = {
      ...animationConfig,
      right: '-1.5rem',
      //transform: 'scale(1.5)',
      transform: 'translate(0, 0)',
      scale: 1.5,
    };
    const navigation = {
      ...animationConfig,
      gap: '0 2rem',
      //transform: 'translateZ(0) scale(2)',
      scale: 2,
      transform: 'translate(0, 0)',
      clearProps: 'all',
    };
    const navigationLink: any = {
      ...animationConfig,
    };
    const linkDividerFirst = {
      ...animationConfig,
      right: '-4.5rem',
      clearProps: 'all',
    };
    const count: any = {
      ...animationConfig,
      transform: 'translate(-1.5rem, 1rem) scale(.7)',
      top: '-1.2rem',
      right: '-2.3rem',
      clearProps: 'all',
    };
    const navLinkText = {
      ...animationConfig,
      // transform: 'translateZ(0) scale(1)',
      scale: 1,
      clearProps: 'all',
      transform: 'translate(0, 0)',
    };

    if (isMobile) {
      linkDivider.right = '-2.5rem';
      linkDividerFirst.right = '-2.5rem';
      // nav.fontSize = '2.4rem';
      navigation.gap = '0 3.5rem';
      navigationLink.fontSize = '2.4rem';
      count.fontSize = '1.2rem';
    }

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
      .from('.navigation', smoothTime, navigation, 'start')
      .from('.navigation__link', smoothTime, navigationLink, 'start')
      .from('.nav-link__text', smoothTime, navLinkText, 'start')
      .from('.nav-link__divider', smoothTime, linkDivider, 'start')
      .from(
        '#pokemonDisplacement',
        smoothTime,
        {
          attr: { scale: 170 },
          force3D: false,
          clearProps: 'all',
          onComplete,
        },
        'start'
      )
      .to(
        '.navigation__link.navigation__link_first .nav-link__divider',
        smoothTime,
        linkDividerFirst,
        'start'
      )
      .from('.nav-link__counts', smoothTime, count, 'start')
      .from(
        '.bottom',
        1.8,
        { ...animationConfig, y: 120, clearProps: 'all' },
        'start'
      )
      .from(
        '.pokemon-svg-wrap',
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
  const nav = {
    ...animationConfig,
  };
  const navigation = {
    ...animationConfig,
    gap: '0 2rem',
    transform: 'scale(2)',
  };
  const navigationLink: any = {
    ...animationConfig,
    top: 'auto',
    right: 'auto',
  };
  const navLinkText = {
    transform: 'scale(1)',
  };
  const linkDivider: any = {
    ...animationConfig,
    right: '-1.5rem',
    transform: 'scale(1.5)',
  };
  const navigationLinkFirst = {
    ...animationConfig,
    marginRight: '1rem',
  };
  const linkDividerFirst = {
    ...animationConfig,
    right: '-2rem',
  };
  const counts = {
    ...animationConfig,
    transform: 'translate(-1.5rem, 1rem) scale(.7)',
    top: '-1.2rem',
    right: '-2.3rem',
  };
  const bottom = {
    ...animationConfig,
    y: 120,
  };
  const header: any = {
    ...animationConfig,
    top: 'calc(100% - 5rem)',
    left: '50%',
  };

  if (isMobile) {
    navigation.gap = '0 0';
    navigation.transform = 'scale(0.99)';

    navLinkText.transform = 'scale(0.7)';

    linkDivider.right = '-0.5rem';

    counts.transform = 'translate(-0.9rem, 0.1rem) scale(0.8)';

    linkDividerFirst.right = '-1.5rem';

    header.top = 'calc(100% - 3.4rem)';
  }

  tl.add('start')
    .to('.pokemon-svg', 0, { display: 'block' })
    .to('.img-trail', 0, { display: 'none' })
    .to('.bottom', smoothTime, bottom, 'start')
    .to('.header', smoothTime, header, 'start')
    .to('.nav', smoothTime, nav, 'start')
    .to('.navigation', smoothTime, navigation, 'start')
    .to('.navigation__link', smoothTime, navigationLink, 'start')
    .to('.nav-link__text', smoothTime, navLinkText, 'start')
    .to('.nav-link__divider', smoothTime, linkDivider, 'start')
    .to(
      '.navigation__link.navigation__link_first ',
      smoothTime,
      navigationLinkFirst,
      'start'
    )
    .to(
      '.navigation__link.navigation__link_first .nav-link__divider',
      smoothTime,
      linkDividerFirst,
      'start'
    )
    .to('.nav-link__counts', smoothTime, counts, 'start')
    .to('.pokemon-svg', smoothTime, { opacity: 0 }, 'start')
    .to(
      '#pokemonDisplacement',
      smoothTime,
      {
        attr: { scale: 250 },
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

  tl.from('.about-img', 1.8, { ease: 'power4.out', opacity: 0 }, 'start')
    .from('.about-content__text', 1.8, { ...animationConfig, y: 150 }, 'start')
    .from('.about-menu__btn', 1.8, { ...animationConfig, y: 70 }, 'start');
};

export const aboutPageExit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };

  tl.to('.about-img', 0.8, { ...animationConfig, opacity: 0 }, 'start')
    .to('.about-content__text', 0.8, { ...animationConfig, y: -150 }, 'start')
    .to('.about-menu__btn', 0.8, { ...animationConfig, y: -70 }, 'start');
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
