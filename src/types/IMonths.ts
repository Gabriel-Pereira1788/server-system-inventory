import { ISale } from "./ISale";

type MonthsData = {
  saled: any[];
  purchased: any[];
};

export type keyMonthsData = keyof MonthsData;
export interface IMonths {
  janeiro: MonthsData;
  feveireiro: MonthsData;
  março: MonthsData;
  abril: MonthsData;
  maio: MonthsData;
  junho: MonthsData;
  julho: MonthsData;
  agosto: MonthsData;
  setembro: MonthsData;
  outubro: MonthsData;
  novembro: MonthsData;
  dezembro: MonthsData;
}

export type keyMonths = keyof IMonths;

export interface IStatiticsPerMonth {
  best_selling: ISale;
  sales_amount: number;
  total_piece_sales: number;
  storage_month: number;
}

export interface IStatiticsTotal {
  total_sales: number;
  total_pieces_sales: number;
  total_storage: number;
}
