import React, { useEffect, useState } from 'react';
import { portfolios } from './mock';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import { gsap } from 'gsap-trial';
import { ScrollTrigger, ScrollSmoother } from 'gsap-trial/all';

import './Portfolios.scss';

export const Portfolios: React.FC = () => {
  const [percent, setPercent] = useState('00');

  const closureRow = () => {
    let rowCount = 0;

    return (row: PortfolioItem[], key: number): JSX.Element => {
      if (rowCount === 4) {
        rowCount = 0;
      }

      rowCount += 1;

      return <PortfolioRow key={key} rowCount={rowCount} row={row} />;
    };
  };

  const getRow = closureRow();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const scrollSmoother = ScrollSmoother.create({
      wrapper: '#portfolios',
      content: '#portfoliosContent',
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
      onUpdate: (ctx) => {
        let scrollPercent: number | string = Math.round(ctx.progress * 100);
        scrollPercent =
          scrollPercent < 10 ? `0${scrollPercent}` : `${scrollPercent}`;

        setPercent(scrollPercent);
      },
    });

    return () => {
      scrollSmoother.kill();
    };
  }, []);

  return (
    <div id="portfolios">
      <div className="entering-wrap">
        <div className="entering">
          <div className="entering__text">Collection of my works</div>
        </div>
      </div>

      <div className="percent-wrap">
        <div className="percent">{percent}&#x25;</div>
      </div>

      <div id="portfoliosContent" className="portfolios">
        {portfolios.map(getRow)}
      </div>
    </div>
  );
};
