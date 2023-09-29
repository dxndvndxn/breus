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
  description: null | PortfolioDesc;
}

export interface PortfolioDesc {
  links?: {
    site?: string;
    behance?: string;
  };
  content: string;
}

export type TPortfolioRow = {
  rowCount: number;
  row: PortfolioItem[];
};

export interface PortfoliosApiResponse {
  count: number;
  portfolios: TPortfolioRow[];
}
