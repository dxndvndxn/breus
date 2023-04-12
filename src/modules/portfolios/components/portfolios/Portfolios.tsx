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
      smooth: 2,
      effects: true,
      //smoothTouch: 0.6,
    });
  }, []);

  return (
    <div id="portfolios">
      <div id="portfoliosContent" className="portfolios">
        {portfolios.map(getRow)}
      </div>
    </div>
  );
};
