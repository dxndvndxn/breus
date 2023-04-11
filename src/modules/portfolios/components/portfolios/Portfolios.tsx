import React, { useState } from 'react';
import { portfolios } from './mock';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import * as gsap from 'gsap';
import ScrollSmoother from 'gsap';
import ScrollTrigger from 'gsap';


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

  return <div className="portfolios">{portfolios.map(getRow)}</div>;
};
