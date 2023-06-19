export interface PortfoliosModel {
  count: number;
  portfolios: Portfolios;
}

export interface PortfolioItem {
  img: string;
  title: string;
}

export type Portfolios = PortfolioItem[][];

export interface PortfoliosApiResponse {
  count: number;
  portfolios: Portfolios;
}
