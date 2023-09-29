import React, { memo } from 'react';
import { windowWidth } from '../../../../common/helpers';
import { TPortfolioRow } from '../../types';
import { PortfolioDescription } from '../portfolioDescription/PortfolioDescription';

import './PortfolioRow.scss';

export const PortfolioRow: React.FC<TPortfolioRow> = memo(
  ({ rowCount, row }) => {
    let Row = null;
    const [itemOne, itemTwo, itemThree] = row;
    const imgOne = `url(${itemOne?.img})`;
    const imgTwo = `url(${itemTwo?.img})`;
    const imgThree = `url(${itemThree?.img})`;
    const isDesktop = windowWidth > 991;
    const first = isDesktop ? 3 : 0;
    const second = isDesktop ? 4 : 0;
    const third = isDesktop ? 5 : 0;

    switch (rowCount) {
      case 1: {
        Row = (
          <div className="portfolio-grid__row portfolio-grid__row-1">
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={first}
            >
              <div
                className="portfolio__img"
                style={{
                  backgroundImage: imgOne,
                }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
              {itemOne.description && (
                <PortfolioDescription {...itemOne.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__large"
              data-scroll
              data-scroll-speed={second}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
              {itemTwo.description && (
                <PortfolioDescription {...itemTwo.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={third}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
              {itemThree.description && (
                <PortfolioDescription {...itemThree.description} />
              )}
            </div>
          </div>
        );
        break;
      }
      case 2: {
        Row = (
          <div className="portfolio-grid__row portfolio-grid__row-2">
            <div
              className="portfolio portfolio__large"
              data-scroll
              data-scroll-speed={first}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
              {itemOne.description && (
                <PortfolioDescription {...itemOne.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__xl"
              data-scroll
              data-scroll-speed={second}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
              {itemTwo.description && (
                <PortfolioDescription {...itemTwo.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__large portfolio__large_m"
              data-scroll
              data-scroll-speed={third}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
              {itemThree.description && (
                <PortfolioDescription {...itemThree.description} />
              )}
            </div>
          </div>
        );
        break;
      }
      case 3: {
        Row = (
          <div className="portfolio-grid__row portfolio-grid__row-3">
            <div
              className="portfolio portfolio__small portfolio__small_m"
              data-scroll
              data-scroll-speed={first}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
              {itemOne.description && (
                <PortfolioDescription {...itemOne.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={second}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
              {itemTwo.description && (
                <PortfolioDescription {...itemTwo.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__large"
              data-scroll
              data-scroll-speed={third}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
              {itemThree.description && (
                <PortfolioDescription {...itemThree.description} />
              )}
            </div>
          </div>
        );
        break;
      }
      case 4: {
        Row = (
          <div className="portfolio-grid__row portfolio-grid__row-4">
            <div
              className="portfolio portfolio__xl"
              data-scroll
              data-scroll-speed={first}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
              {itemOne.description && (
                <PortfolioDescription {...itemOne.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={second}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
              {itemTwo.description && (
                <PortfolioDescription {...itemTwo.description} />
              )}
            </div>
            <div
              className="portfolio portfolio__small portfolio__small_m"
              data-scroll
              data-scroll-speed={third}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
              {itemThree.description && (
                <PortfolioDescription {...itemThree.description} />
              )}
            </div>
          </div>
        );
        break;
      }
      default: {
        return null;
      }
    }

    return Row;
  }
);
