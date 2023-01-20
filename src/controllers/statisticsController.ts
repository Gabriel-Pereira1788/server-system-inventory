import { Request, Response } from "express";

import { ProductModel } from "../models/Products";
import { PurchaseModel } from "../models/Purchases";
import { SaleModel } from "../models/Sales";
import { calculateByFilter, Filter } from "../modules/calculateByFilter";
import { calculatePerMonth } from "../modules/calculatePerMonth";
import { calculateTotal } from "../modules/calculateTotal";
import { getRelevantStatistics } from "../modules/relevantStatistics";
import { ITestProduct } from "../types/IProduct";

export async function getStatistics(req: Request, res: Response) {
  try {
    const idUser = req.params.id;
    const { filter } = req.query;
    if (filter) {
      return getStatisticsByFilter(idUser, filter as Filter, res);
    }
    console.log(req);

    const allProducts = await ProductModel.find({ id_user: idUser });
    const allSales = await SaleModel.find({ id_user: idUser });
    const allPurchases = await PurchaseModel.find({ id_user: idUser });

    const dataMonth = calculatePerMonth(allSales, allPurchases);
    const dataTotal = calculateTotal(dataMonth, allProducts);
    const relevantStatistics = getRelevantStatistics(dataMonth);
    return res.status(200).json({ dataMonth, dataTotal, relevantStatistics });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}

async function getStatisticsByFilter(
  idUser: string,
  filter: Filter,
  res: Response
) {
  try {
    console.log(filter);
    const allProducts = await ProductModel.find({ id_user: idUser });
    const allSales = await SaleModel.find({ id_user: idUser });
    const allPurchases = await PurchaseModel.find({ id_user: idUser });

    const statisticsByFilter = await calculateByFilter(
      filter,
      allSales,
      allPurchases
    );

    console.log(statisticsByFilter);

    return res.status(200).json({ statisticsByFilter });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}
