import { Request, Response } from "express";
import { Product } from "../entities/product";
import { Purchase } from "../entities/purchase";
import { Sale } from "../entities/sale";
import { ProductModel } from "../models/Products";
import { PurchaseModel } from "../models/Purchases";
import { SaleModel } from "../models/Sales";
import { calculatePerMonth } from "../modules/calculatePerMonth";
import { getRelevantStatistics } from "../modules/relevantStatistics";
import { IProduct } from "../types/IProduct";

export async function getProductsByUser(req: Request, res: Response) {
  try {
    const { id, category } = req.params;
    let allProducts;
    if (category !== "todas") {
      allProducts = await ProductModel.find({
        id_user: id,
        category: category,
      });
    } else allProducts = await ProductModel.find({ id_user: id });

    const dataProduct = await Promise.all(
      allProducts.map(async (product) => {
        const salesProduct = await SaleModel.find({
          id_user: id,
          id_product: product.id_product,
        });
        const purchasesProduct = await PurchaseModel.find({
          id_user: id,
          id_product: product.id_product,
        });

        const dataMonth = calculatePerMonth(salesProduct, purchasesProduct);
        const relevantStatistics = getRelevantStatistics(dataMonth);
        return { relevantStatistics, product };
      })
    );

    res.status(200).send({ dataProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const data: IProduct = req.body;
    const { storage, id_user, price_purchased, price_saled, id_product } = data;
    const productData = new Product(data);
    const purchasedData = {
      storage,
      id_user,
      id_product: productData.id_product,
      price_purchased,
      price_saled,
      pieces_purchased: storage,
    };
    const responseP = await ProductModel.create(productData);
    console.log(responseP);

    await PurchaseModel.create(purchasedData);
    return res.status(200).json({ message: "Produto criado com sucesso." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro de servidor" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ id_product: id });

    if (!product) {
      return res.status(404).json({ error: "O Produto não existe " });
    }

    await product.delete();

    return res.status(200).send({ message: "Produto removido com sucesso." });
  } catch (error) {
    return res.status(500).send({ message: "Erro no servidor" });
  }
}

export async function editProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    const idProduct = req.params.id;
    const product = ProductModel.findOne({ id_product: idProduct });
    await product.update(data);

    return res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}

export async function purchasedProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    const purchasedData = new Purchase(data);
    console.log(purchasedData);
    await PurchaseModel.create(purchasedData);

    return res.status(200).json({ message: "Sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}

export async function saledProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    const dataSaled = new Sale(data);
    await SaleModel.create(dataSaled);
    return res.status(200).json({ message: "Sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}
