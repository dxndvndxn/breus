import { gsap } from 'gsap';

export const enter = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.out',
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  };

  tl.fromTo(
    '.portfolios',
    { visibility: 'hidden' },
    { visibility: 'visible' },
    '-=0.8'
  )
    .from(
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
    .fromTo(
      '.portfolios',
      1,
      {
        ease: 'circ.easeOut',
        position: 'absolute',
        y: '100%',
      },
      {
        ease: 'circ.easeOut',
        y: 0,
      },
      '-=0.9'
    );
};

export const exit = (tl: gsap.core.Timeline) => {
  const animationConfig = {
    ease: 'power4.in',
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  document.getElementById('portfoliosContent').style.transform =
    document.documentElement.style.getPropertyValue('--portfolio-translate');

  tl.set(
    '.portfolios',
    {
      transform: document.documentElement.style.getPropertyValue(
        '--portfolio-translate'
      ),
    },
    '-=1'
  );
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
