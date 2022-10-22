import { Request, Response } from "express";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductModel } from "../models/Products";
import { PurchaseModel } from "../models/Purchases";
import { SaleModel } from "../models/Sales";
import { calculatePerMonth } from "../modules/calculatePerMonth";
import { calculateTotal } from "../modules/calculateTotal";
import { getRelevantStatistics } from "../modules/relevantStatistics";
import { ITestProduct } from "../types/IProduct";

export async function getStatistics(req: Request, res: Response) {
  try {
    const idUser = req.params.id;

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
