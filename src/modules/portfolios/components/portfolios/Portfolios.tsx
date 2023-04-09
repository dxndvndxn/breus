import React, { useState } from 'react';
import { portfolios } from './mock';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
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

  // const parallaxScroll = () => {
  //   const scrollTop = document.getElementById('root')!;
  //   const { y } = scrollTop.getBoundingClientRect();
  //   const evenImgPos = y / 2.5;
  //   setParallax(evenImgPos);
  // };
  //
  // useEffect(() => {
  //   document.addEventListener('scroll', parallaxScroll);
  //
  //   return () => {
  //     document.removeEventListener('scroll', parallaxScroll);
  //   };
  // }, []);

  return <div className="portfolios">{portfolios.map(getRow)}</div>;
};
