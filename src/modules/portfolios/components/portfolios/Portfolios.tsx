import React, { useEffect, useState } from 'react';
import { portfolios } from './mock';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import { gsap } from 'gsap-trial';
import { ScrollTrigger, ScrollSmoother } from 'gsap-trial/all';
import { useHeadMenu } from '../../../../common/hooks';
import './Portfolios.scss';
import { createPortal } from 'react-dom';

export const Portfolios: React.FC = () => {
  const [percent] = useState(0);
  const headMenu = useHeadMenu();

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
      {headMenu &&
        createPortal(<div className="percent">{percent}</div>, headMenu)}

      <div id="portfoliosContent" className="portfolios">
        {portfolios.map(getRow)}
      </div>
    </div>
  );
};
