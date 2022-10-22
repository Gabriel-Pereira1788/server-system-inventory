import { IMonths, keyMonths, keyMonthsData } from "../types/IMonths";
import { IStatiticsPerMonth } from "../types/IStatistics";

export const separatePerMonth = (data: any[], dataPurchased?: any[]) => {
  const MONTHS: IMonths = {
    janeiro: { saled: [], purchased: [] },
    feveireiro: { saled: [], purchased: [] },
    março: { saled: [], purchased: [] },
    abril: { saled: [], purchased: [] },
    maio: { saled: [], purchased: [] },
    junho: { saled: [], purchased: [] },
    julho: { saled: [], purchased: [] },
    agosto: { saled: [], purchased: [] },
    setembro: { saled: [], purchased: [] },
    outubro: { saled: [], purchased: [] },
    novembro: { saled: [], purchased: [] },
    dezembro: { saled: [], purchased: [] },
  };
  const separete = (data: any[], key: keyMonthsData) => {
    data.forEach((sales) => {
      const dateConvert = new Date(sales.createdAt);
      // console.log(sales);
      // console.log(new Date(sales.date).getMonth());
      const month = dateConvert.getMonth();
      switch (month) {
        case 0:
          MONTHS.janeiro[key].push(sales);
          break;
        case 1:
          MONTHS.feveireiro[key].push(sales);
          break;
        case 2:
          MONTHS.março[key].push(sales);
          break;
        case 3:
          MONTHS.abril[key].push(sales);
          break;
        case 4:
          MONTHS.maio[key].push(sales);
          break;
        case 5:
          MONTHS.junho[key].push(sales);
          break;
        case 6:
          MONTHS.julho[key].push(sales);
          break;
        case 7:
          MONTHS.agosto[key].push(sales);
          break;
        case 8:
          MONTHS.setembro[key].push(sales);
          break;
        case 9:
          MONTHS.outubro[key].push(sales);
          break;
        case 10:
          MONTHS.novembro[key].push(sales);
          break;
        case 11:
          MONTHS.dezembro[key].push(sales);
          break;
      }
    });
  };

  separete(data, "saled");
  if (dataPurchased) separete(dataPurchased, "purchased");
  return MONTHS;
};

const calculateTotalPerMonth = (
  daysSaled: any[],
  daysPurchased: any[]
): IStatiticsPerMonth => {
  const sales_amount = daysSaled.reduce(
    (acc, day) =>
      (acc += (day.price_saled - day.price_purchased) * day.pieces_saled),
    0
  );
  const total_piece_sales = daysSaled.reduce(
    (acc, day) => (acc += day.pieces_saled),
    0
  );
  const maxSaled = Math.max(...daysSaled.map((day) => day.pieces_saled));
  const best_selling = daysSaled.find((day) => day.pieces_saled === maxSaled);
  const storage_month = daysPurchased.reduce(
    (acc, day) => (acc += day.pieces_purchased),
    0
  );
  // best_selling.data_sale = best_selling.date_sale.toString();

  return {
    total_piece_sales,
    sales_amount,
    best_selling,
    storage_month,
  };
};

export const calculatePerMonth = (dataSale: any[], dataPurchased: any[]) => {
  /*Refatorar logica para melhor junção dos dois dados */
  const dataPerMonths = separatePerMonth(dataSale, dataPurchased);

  const dataTest: { [index: string]: IStatiticsPerMonth } = Object.entries(
    dataPerMonths
  )
    .filter(([key, value]) => value.saled.length > 0)
    .map(([key, value], index) => {
      return [key, calculateTotalPerMonth(value.saled, value.purchased)];
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  // console.log("teste", dataPerMonths);
  // console.log(dataTest);
  return dataTest;
};
