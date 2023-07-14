import React, { useLayoutEffect, useState } from 'react';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { PortfolioItem } from '../../types';
import { useAppSelector } from '../../../../common/store';

import './Portfolios.scss';

export const Portfolios: React.FC = () => {
  const { portfolios, count } = useAppSelector(
    (state) => state.portfoliosReducer
  );
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

  useLayoutEffect(() => {
    document.body.classList.add('doc-overflow');
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

      <div id="portfoliosContent" className="portfolios">
        {portfolios.length > 0 && portfolios.map(getRow)}
      </div>
    </div>
  );
};
