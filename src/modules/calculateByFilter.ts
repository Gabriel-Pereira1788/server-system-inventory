import { getBestSelling } from "../functions/getBestSelling";
import { filterDate } from "./filterDate";

export type Filter = "day" | "week" | "month" | "3 month" | "6 month" | "year";

export const calculateByFilter = async (
  filter: Filter,
  dataSale: any[],
  dataPurchased: any[]
) => {
  const filteredPurchases = filterDate(dataPurchased, filter);
  const filteredSales = filterDate(dataSale, filter);

  return {
    parts_entered: filteredPurchases.reduce(
      (acc, item) => (acc += item.pieces_purchased),
      0
    ),
    parts_leave: filteredSales.reduce(
      (acc, item) => (acc += item.pieces_saled),
      0
    ),
    best_selling: await getBestSelling(filteredSales),
    total_sales: filteredSales.reduce((acc, item) => {
      const total =
        (item.price_saled - item.price_purchased) * item.pieces_saled;
      acc += total;
      return acc;
    }, 0),
  };
};

