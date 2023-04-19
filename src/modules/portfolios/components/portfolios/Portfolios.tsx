import React, { useEffect, useState } from 'react';
import { portfolios } from './mock';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import { gsap } from 'gsap-trial';
import { ScrollTrigger, ScrollSmoother } from 'gsap-trial/all';
import { useHeadMenu } from '../../../../common/hooks';
import { createPortal } from 'react-dom';

import './Portfolios.scss';
// ScrollTrigger.normalizeScroll();

export const Portfolios: React.FC = () => {
  const headMenu = useHeadMenu();
  const [percent, setPercent] = useState(0);
  // const scrollPercentage = useScrollPercentage();

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
        const scrollPercent = Math.round(ctx.progress * 100);
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

      {headMenu &&
        createPortal(<div className="percent">{percent}</div>, headMenu)}

      <div id="portfoliosContent" className="portfolios">
        {portfolios.map(getRow)}
      </div>
    </div>
  );
};
