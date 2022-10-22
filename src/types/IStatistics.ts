import { ISale } from "./ISale";

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

export interface IRelevantStatistics {
  data_last_month: IStatiticsPerMonth;
  data_current_month: IStatiticsPerMonth;
}
