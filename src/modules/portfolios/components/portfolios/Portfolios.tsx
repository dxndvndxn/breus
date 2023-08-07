import React, { createRef, useEffect, useState } from 'react';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import { useAppSelector } from '../../../../common/store';
import LocomotiveScroll from 'locomotive-scroll';

import './Portfolios.scss';

export const Portfolios: React.FC = () => {
  const { portfolios, count } = useAppSelector(
    (state) => state.portfoliosReducer
  );
  const [percent, setPercent] = useState('00');
  const portfoliosContainer = createRef<HTMLDivElement>();

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
    document.body.classList.add('doc-overflow');

    if (portfoliosContainer.current) {
      const portfolioContainer = portfoliosContainer.current;

      setTimeout(() => {
        const portfoliosScroll = new LocomotiveScroll({
          el: portfolioContainer,
          smooth: true,
        });

        portfoliosScroll.on('scroll', (args) => {
          const { limit, scroll } = args;
          const percentScroll = Math.floor((scroll.y * 100) / limit.y);
          setPercent(
            percentScroll < 10 ? `0${percentScroll}` : `${percentScroll}`
          );
        });
      }, 1700);
    }

    return () => {
      document.body.classList.remove('doc-overflow');
    };
  }, [count]);

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

      <div
        id="portfoliosContent"
        className="portfolios"
        ref={portfoliosContainer}
        data-scroll-container
        data-scroll-section
      >
        {portfolios.length > 0 && portfolios.map(getRow)}
      </div>
    </div>
  );
};
