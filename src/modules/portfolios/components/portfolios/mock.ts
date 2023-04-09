import { PortfolioItem, Portfolios } from '../../types';
import mockImage from '../../../../assets/images/mock-portfolio.png';

const portfolio: PortfolioItem[] = [
  {
    img: mockImage,
    title: 'Adchampange, Website design',
  },
  {
    img: '',
    title: 'Adchampange, Website design',
  },
  {
    img: '',
    title: 'Adchampange, Website design',
  },
];
export const portfolios: Portfolios = [
  portfolio,
  portfolio,
  portfolio,
  portfolio,
];
