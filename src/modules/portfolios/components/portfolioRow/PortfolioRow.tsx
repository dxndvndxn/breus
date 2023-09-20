import React, { memo } from 'react';
import { PortfolioItem } from '../../types';
import './PortfolioRow.scss';
import { windowWidth } from '../../../../common/helpers';

interface IPortfolioRow {
  rowCount: number;
  row: PortfolioItem[];
}

export const PortfolioRow: React.FC<IPortfolioRow> = memo(
  ({ rowCount, row }) => {
    let Row = null;
    const [itemOne, itemTwo, itemThree] = row;
    const imgOne = `url(${itemOne?.img})`;
    const imgTwo = `url(${itemTwo?.img})`;
    const imgThree = `url(${itemThree?.img})`;
    const isDesktop = windowWidth > 991;
    const scrollSpeedFirst = isDesktop ? 15 : 1;
    const scrollSpeedSecond = isDesktop ? 2 : 1;
    const scrollSpeedThird = isDesktop ? 2 : 1;
    const scrollSpeedFourth = isDesktop ? 2 : 1;

    switch (rowCount) {
      case 1: {
        Row = (
          <div className="portfolio-grid__row portfolio-grid__row-1">
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={3}
              data-scroll-call="{y,o,l,o}"
            >
              <div
                className="portfolio__img"
                style={{
                  backgroundImage: imgOne,
                }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div
              className="portfolio portfolio__large"
              data-scroll
              data-scroll-speed={4}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={5}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
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
              data-scroll-speed={3}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div
              className="portfolio portfolio__xl"
              data-scroll
              data-scroll-speed={4}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div
              className="portfolio portfolio__large portfolio__large_m"
              data-scroll
              data-scroll-speed={5}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
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
              data-scroll-speed={3}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={4}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div
              className="portfolio portfolio__large"
              data-scroll
              data-scroll-speed={5}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
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
              data-scroll-speed={3}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div
              className="portfolio portfolio__small"
              data-scroll
              data-scroll-speed={4}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div
              className="portfolio portfolio__small portfolio__small_m"
              data-scroll
              data-scroll-speed={5}
            >
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgThree }}
              />
              <div className="portfolio__title">{itemThree?.title}</div>
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
