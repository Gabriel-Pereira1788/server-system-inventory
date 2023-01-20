import { ProductModel } from "../models/Products";

export async function getBestSelling(dataSales: any[]) {
  const maxSaled = Math.max(...dataSales.map((day) => day.pieces_saled));
  const sale = dataSales.find((day) => day.pieces_saled === maxSaled);

  const product = sale
    ? await ProductModel.findOne({
        id_product: sale.id_product,
      })
    : null;

  return {
    product,
    data_sale: sale ? sale : null,
  };
}

