import React, { createRef, useEffect, useRef, useState } from 'react';
import { PortfolioRow } from '../portfolioRow/PortfolioRow';
import { useAppDispatch, useAppSelector } from '../../../../common/store';
import { portfoliosActions, fetchPortfolios } from '../../PortfoliosSlice';
import { paginationSlice } from '../../../../common/helpers';
import LocomotiveScroll from 'locomotive-scroll';

import './Portfolios.scss';

export const Portfolios: React.FC = () => {
  const { portfolios, count, start, canFetchMorePortfolios } = useAppSelector(
    (state) => state.portfoliosReducer
  );
  const { animationComplete } = useAppSelector((state) => state.appReducer);
  const { setStart } = portfoliosActions;
  const [percent, setPercent] = useState('00');
  const isResized = useRef(false);
  const [locomotive, setLocomotive] = useState<LocomotiveScroll>();
  const dispatch = useAppDispatch();
  const portfoliosContainer = createRef<HTMLDivElement>();

  const smoothUpdatePercent = (num: number) =>
    new Promise((resolve) => {
      let n = 100;
      const interval = setInterval(() => {
        n = n - 1;
        setPercent(`${n}`);

        if (n <= num) {
          clearInterval(interval);
          resolve(true);
        }
      }, 50);
    });

  const initLocomotive = (el: HTMLDivElement) => {
    const root = document.documentElement;
    const portfoliosScroll = new LocomotiveScroll({
      el,
      smooth: true,
      lerp: 0.1,
      reloadOnContextChange: true,
      scrollFromAnywhere: true,
      repeat: true,
      smartphone: {
        smooth: true,
        direction: 'vertical',
        gestureDirection: 'vertical',
      },
    });

    let isResolved = true;

    portfoliosScroll.on('scroll', (args) => {
      const { limit, scroll } = args;
      const percentScroll = Math.floor((scroll.y * 100) / limit.y);

      if (!isResized.current) {
        setPercent(
          percentScroll < 10 ? `0${percentScroll}` : `${percentScroll}`
        );
      } else {
        if (isResolved && percentScroll !== 100) {
          isResolved = false;

          smoothUpdatePercent(percentScroll).then(() => {
            isResized.current = false;
            isResolved = true;
          });
        }
      }

      root.style.setProperty('--portfolio-translate', el.style.transform);
    });

    setLocomotive(portfoliosScroll);
  };

  useEffect(() => {
    if (portfoliosContainer.current && !locomotive) {
      const el = portfoliosContainer.current;
      initLocomotive(el);
    }

    if (locomotive) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [count, animationComplete]);

  useEffect(
    () => () => {
      document.documentElement.style.setProperty(
        '--portfolio-translate',
        'translate(0px, 0%)'
      );
      locomotive?.destroy();
    },
    []
  );

  useEffect(() => {
    if (percent === '100' && locomotive && canFetchMorePortfolios) {
      dispatch(setStart(start + paginationSlice));
      dispatch(fetchPortfolios(start + paginationSlice))
        .unwrap()
        .then(() => {
          isResized.current = true;
          window.dispatchEvent(new Event('resize'));
          locomotive.update();
        });
    }
  }, [percent, locomotive, canFetchMorePortfolios]);

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
      >
        {portfolios.length > 0 &&
          portfolios.map((portfolioItem, i) => (
            <PortfolioRow
              row={portfolioItem.row}
              rowCount={portfolioItem.rowCount}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};
