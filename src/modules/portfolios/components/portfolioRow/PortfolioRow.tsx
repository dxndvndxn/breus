import React, { memo } from 'react';
import { PortfolioItem } from '../../types';
import './PortfolioRow.scss';

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
    const speed = 1.2;

    switch (rowCount) {
      case 1: {
        Row = (
          <div
            className="portfolio-grid__row portfolio-grid__row-1"
            data-speed={speed}
          >
            <div className="portfolio portfolio__small">
              <div
                className="portfolio__img"
                style={{
                  backgroundImage: imgOne,
                }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div className="portfolio portfolio__large">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div className="portfolio portfolio__small">
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
          <div
            className="portfolio-grid__row portfolio-grid__row-2"
            data-speed={speed}
          >
            <div className="portfolio portfolio__large">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div className="portfolio portfolio__xl">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div className="portfolio portfolio__large portfolio__large_m">
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
          <div
            className="portfolio-grid__row portfolio-grid__row-3"
            data-speed={speed}
          >
            <div className="portfolio portfolio__small portfolio__small_m">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div className="portfolio portfolio__small">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div className="portfolio portfolio__large">
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
          <div
            className="portfolio-grid__row portfolio-grid__row-4"
            data-speed={speed}
          >
            <div className="portfolio portfolio__xl">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgOne }}
              />
              <div className="portfolio__title">{itemOne?.title}</div>
            </div>
            <div className="portfolio portfolio__small">
              <div
                className="portfolio__img"
                style={{ backgroundImage: imgTwo }}
              />
              <div className="portfolio__title">{itemTwo?.title}</div>
            </div>
            <div className="portfolio portfolio__small portfolio__small_m">
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
