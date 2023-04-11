import React, { useEffect, useState } from 'react';
import { portfolios } from './mock';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import { gsap } from 'gsap-trial';
import { ScrollTrigger, ScrollSmoother } from 'gsap-trial/all';
import './Portfolios.scss';

export const Portfolios: React.FC = () => {
  const [parallax] = useState(0);
  const closureRow = () => {
    let rowCount = 0;

    return (row: PortfolioItem[], key: number): JSX.Element => {
      if (rowCount === 4) {
        rowCount = 0;
      }

      rowCount += 1;

      return (
        <PortfolioRow
          parallax={parallax}
          key={key}
          rowCount={rowCount}
          row={row}
        />
      );
    };
  };

  const getRow = closureRow();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      wrapper: '#portfolios',
      content: '#portfoliosContent',
      //normalizeScroll: true,
      smooth: 2, // seconds it takes to "catch up" to native scroll position
      effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
      // smoothTouch: 0.1,
    });

    // smoothPortfolio.effects('.portfolio__img', {
    //   speed: 'auto',
    // });
  }, []);

  return (
    <div id="portfolios">
      <div id="portfoliosContent" className="portfolios">
        {portfolios.map(getRow)}
      </div>
    </div>
  );
};
