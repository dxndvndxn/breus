export interface PortfoliosModel {
  count: number;
  start: number;
  portfolios: TPortfolioRow[];
  canFetchMorePortfolios: boolean;
}

export interface PortfolioItem {
  id: number;
  img: string;
  title: string;
}

export type TPortfolioRow = {
  rowCount: number;
  row: PortfolioItem[];
};

export interface PortfoliosApiResponse {
  count: number;
  portfolios: TPortfolioRow[];
}
