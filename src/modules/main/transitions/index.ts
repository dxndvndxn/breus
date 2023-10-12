import { windowWidth } from '../../../common/helpers';
import { gsap } from 'gsap';

const isMobile = windowWidth < 991;

export const enter = (tl: gsap.core.Timeline, isFirstLoad = true) => {
  const onComplete = () => {
    if (!isMobile) {
      setTimeout(() => {
        document
          .querySelector<HTMLElement>('.pokemon-svg')!
          .classList.add('pokemon-svg_none');
      });
      const trails = document.querySelectorAll('.img-trail');

      trails.forEach((trail) => {
        trail.classList.remove('pokemon-svg_none');
      });
    }
  };

  if (isFirstLoad) {
    const animationConfig = {
      ease: 'power4.out',
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
      force3D: false,
    };

    tl.add('start')
      .from('.logo', 1.8, { ...animationConfig, y: 50 }, 'start')
      .from('.bottom', 1.8, { ...animationConfig, y: 120 }, 'start')
      .from('.navigation__item', 1.8, { ...animationConfig, y: 220 }, 'start')
      .from(
        '.pokemon-svg-wrap',
        0.8,
        {
          opacity: 0,
          y: 40,
        },
        'start'
      )
      .from(
        '#pokemonDisplacement',
        2,
        {
          ease: 'power1.out',
          attr: { scale: 170 },
          onComplete,
        },
        'start'
      );
  } else {
    const duration = 1.24;
    const animationConfig = {
      ease: 'power3.out',
      force3D: false,
      duration,
    };
    const navigation: any = {
      ...animationConfig,
      gap: '0 7rem',
      height: '3.2rem',
    };
    const navigationLinkFirst = { ...animationConfig, marginRight: '8px' };
    const count: any = {
      ...animationConfig,
      top: '-0.7rem',
      right: '-2.5rem',
      scale: 1.2,
    };
    const header = {
      from: {
        ...animationConfig,
        top: '95.2%',
        left: '50%',
        transform: 'translateX(-48%)',
      },
      to: {
        ...animationConfig,
        left: '50%',
        top: '50%',
        transform: 'translate(calc(-50% + 0.4rem), calc(-50% - .9rem))',
      },
    };
    const navigationItem1: any = {
      from: {
        ...animationConfig,
        x: '26.8%',
      },
      to: {
        ...animationConfig,
        x: 'auto',
      },
    };
    const navigationItem2: any = {
      from: {
        ...animationConfig,
        x: '0.8%',
      },
      to: {
        ...animationConfig,
        x: 'auto',
      },
    };
    const navigationItem3: any = {
      from: {
        ...animationConfig,
        x: '-159%',
      },
      to: {
        ...animationConfig,
        x: 'auto',
      },
    };
    const navLinkText = { ...animationConfig, scale: 1.9 };
    let linkDivider: any = {
      ...animationConfig,
      top: 0,
      x: '-11.5rem',
      scale: 3,
    };
    const linkDividerFirst: any = {
      from: {
        ...animationConfig,
        x: '-9rem',
      },
      to: {
        ...animationConfig,
        x: '0',
      },
    };
    const bottom = {
      ...animationConfig,
      y: 120,
      clearProps: 'all',
      duration: 1.8,
    };
    const pokemonSvgWrap = {
      opacity: 0,
      y: 40,
      duration: 0.8,
      force3D: false,
    };
    let pokemon: any = {
      attr: { scale: 170 },
      force3D: false,
      onComplete,
    };

    if (isMobile) {
      header.from.left = '50%';
      header.from.transform = 'translateX(-50%)';
      header.from.top = '93%';
      header.to.transform = 'translate(calc(-50%), calc(-50% - 0.3rem))';

      navLinkText.scale = 1.6;

      navigation.width = '31rem';

      navigationItem1.from.x = '4%';
      navigationItem1.from.y = '-47%';

      navigationItem2.from.x = '-1%';
      navigationItem2.from.y = '-47%';

      navigationItem3.from.x = '-24%';
      navigationItem3.from.y = '-47%';

      linkDividerFirst.from = {
        ...animationConfig,
        transform: 'translate(-1.4rem, 0) scale(2.4)',
      };

      linkDivider = {
        ...animationConfig,
        transform: 'translate(-1.9rem, 0) scale(2.4)',
      };

      count.scale = 0.9;
      count.top = '-0.3rem';
      count.right = '-2.2rem';

      pokemon = {};
    }

    tl.add('start')
      .fromTo('.header', header.from, header.to, 'start')
      .from('.navigation', navigation, 'start')
      .fromTo(
        '.navigation__item:nth-child(1)',
        navigationItem1.from,
        navigationItem1.to,
        'start'
      )
      .fromTo(
        '.navigation__item:nth-child(2)',
        navigationItem2.from,
        navigationItem2.to,
        'start'
      )
      .fromTo(
        '.navigation__item:nth-child(3)',
        navigationItem3.from,
        navigationItem3.to,
        'start'
      )
      .from('.nav-link__text', navLinkText, 'start')
      .from('.nav-link__divider', linkDivider, 'start')
      .fromTo(
        '.navigation__link.navigation__link_first .nav-link__divider',
        linkDividerFirst.from,
        linkDividerFirst.to,
        'start'
      )
      .from('#pokemonDisplacement', duration, pokemon, 'start')
      .from(
        '.navigation__link.navigation__link_first',
        navigationLinkFirst,
        'start'
      )
      .from('.nav-link__counts', count, 'start')
      .from('.bottom', bottom, 'start')
      .from('.pokemon-svg-wrap', 0.8, pokemonSvgWrap, 'start');
  }
};

export const exit = (tl: gsap.core.Timeline) => {
  const duration = 1.24;
  const animationConfig = {
    ease: 'power3.out',
    force3D: false,
    duration,
  };

  if (isMobile) {
    animationConfig.duration = 1;
    animationConfig.ease = 'liner';
    tl.set('.pokemon-svg__g', { display: 'none' });
    tl.set('.pokemon-svg__image', { display: 'block' });
    tl.set('#distortionFilter', { display: 'none' });
  }

  const navigation: any = {
    ...animationConfig,
    gap: '0 7rem',
    width: '31rem',
    height: '3.2rem',
  };
  const linkDivider: any = {
    ...animationConfig,
    right: '-4rem',
    top: 0,
    scale: 3,
  };
  const counts: any = {
    ...animationConfig,
    top: '-0.7rem',
    right: '-2.5rem',
    scale: 1.2,
  };
  const navigationLinkFirst = {
    ...animationConfig,
    marginRight: '8px',
  };
  const linkDividerFirst = {
    ...animationConfig,
    right: '-5rem',
  };
  const navLinkText: any = {
    ...animationConfig,
    scale: 1.9,
  };
  const bottom = {
    ...animationConfig,
    y: 120,
  };
  const header: any = {
    ...animationConfig,
    left: '50%',
    top: '95%',
    transform: 'translate(-17%, 0)',
  };
  const navigationItem1: any = {
    ...animationConfig,
    left: '7%',
    top: '36%',
  };
  const navigationItem2: any = {
    ...animationConfig,
    left: '44.5%',
    top: '36%',
  };
  const navigationItem3: any = {
    ...animationConfig,
    left: '83%',
    top: '36%',
  };
  let pokemon: any = {
    attr: { scale: 250 },
  };

  if (isMobile) {
    animationConfig.duration = 1.5;
    navLinkText.scale = 1.6;

    counts.scale = 0.9;
    counts.top = '-0.3rem';
    counts.right = '-2.2rem';

    header.top = '93%';
    header.transform = 'translate(-50%, 0)';

    navigationItem1.top = '28%';
    navigationItem1.width = '28%';
    navigationItem1.left = '14%';

    navigationItem2.top = '28%';
    navigationItem2.width = '28%';
    navigationItem2.left = '43%';

    navigationItem3.top = '28%';
    navigationItem3.width = '28%';
    navigationItem3.left = '74%';

    linkDivider.scale = 2.4;
    linkDivider.right = '-3rem';

    linkDividerFirst.right = '-3.8rem';

    pokemon = {};
  }

  tl.set('.navigation__link.navigation__link_first .nav-link__divider', {
    x: 0,
  });

  if (!isMobile) {
    tl.set('.img-trail', { display: 'none' });
  }

  tl.add('start')
    .to('.pokemon-svg', 0, { display: 'block' })
    .to('.bottom', bottom, 'start')
    .to('.header', header, 'start')
    .to('.navigation', navigation, 'start')
    .to('.nav-link__text', navLinkText, 'start')
    .to('.nav-link__divider', linkDivider, 'start')
    .to(
      '.navigation__link.navigation__link_first',
      navigationLinkFirst,
      'start'
    )
    .to(
      '.navigation__link.navigation__link_first .nav-link__divider',
      linkDividerFirst,
      'start'
    )
    .to('.nav-link__counts', counts, 'start')
    .to('.pokemon-svg', { opacity: 0 }, 'start')
    .to('.navigation__item:nth-child(1)', navigationItem1, 'start')
    .to('.navigation__item:nth-child(2)', navigationItem2, 'start')
    .to('.navigation__item:nth-child(3)', navigationItem3, 'start')
    .to('#pokemonDisplacement', duration, pokemon, 'start');
};
