import React, { useEffect, useRef, useState } from 'react';
import { PortfolioDesc } from '../../types';
import './PortfolioDescription.scss';
import { gsap } from 'gsap';

export const PortfolioDescription: React.FC<PortfolioDesc> = ({
  links = null,
  content,
}) => {
  const [tl] = useState(gsap.timeline());
  const desc = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const linksWrap = useRef<HTMLDivElement>(null);

  const initStyles = () => {
    const linkNodes = Array.from(linksWrap.current!.childNodes);
    gsap.set(desc.current, {
      backdropFilter: 'blur(0)',
      background: 'rgba(0, 0, 0, 0)',
    });
    gsap.set(text.current, {
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
      y: 300,
    });
    gsap.set(linkNodes, {
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
      y: 150,
    });
  };

  useEffect(() => {
    initStyles();
  }, []);

  const showDesc = (direction: 'in' | 'out') => {
    const animationConfig = {
      ease: 'power4.out',
      duration: 0.7,
    };
    const linkNodes = Array.from(linksWrap.current!.childNodes);
    const aa = tl
      .add('in')
      .to(
        desc.current!,
        {
          ...animationConfig,
          backdropFilter: 'blur(1.7rem)',
          background: 'rgba(0, 0, 0, 0.6)',
        },
        'in'
      )
      .to(
        text.current,
        {
          ...animationConfig,
          y: 0,
          skewY: 0,
          stagger: {
            amount: 0,
          },
        },
        'in'
      )
      .to(
        linkNodes,
        {
          ...animationConfig,
          y: 0,
          skewY: 0,
          stagger: {
            amount: 0,
          },
        },
        'in'
      );

    tl.reversed(true);

    if (direction === 'in') {
      aa.play();
    } else {
      tl.reverse(0.2).then(() => {
        initStyles();
      });
    }
  };

  return (
    <div
      className="portfolio-desc"
      ref={desc}
      onMouseEnter={() => showDesc('in')}
      onMouseLeave={() => showDesc('out')}
    >
      <div className="portfolio-desc__text-wrap">
        <p className="portfolio-desc__text" ref={text}>
          {content}
        </p>
      </div>

      {links && (
        <div className="portfolio-desc__links" ref={linksWrap}>
          {links.site && (
            <a
              href={links.site}
              className="portfolio-desc__link"
              target="_blank"
            >
              Website
            </a>
          )}
          {links.behance && (
            <a
              href={links.behance}
              className="portfolio-desc__link"
              target="_blank"
            >
              Behance
            </a>
          )}
        </div>
      )}
    </div>
  );
};
