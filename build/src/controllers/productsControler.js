"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saledProduct = exports.purchasedProduct = exports.editProduct = exports.deleteProduct = exports.createProduct = exports.getProductsByUser = void 0;
const product_1 = require("../entities/product");
const purchase_1 = require("../entities/purchase");
const sale_1 = require("../entities/sale");
const Products_1 = require("../models/Products");
const Purchases_1 = require("../models/Purchases");
const Sales_1 = require("../models/Sales");
const calculatePerMonth_1 = require("../modules/calculatePerMonth");
const relevantStatistics_1 = require("../modules/relevantStatistics");
function getProductsByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, category } = req.params;
            console.log(category);
            let allProducts;
            if (category !== "todas") {
                allProducts = yield Products_1.ProductModel.find({
                    id_user: id,
                    category: category,
                });
            }
            else
                allProducts = yield Products_1.ProductModel.find({ id_user: id });
            const dataProduct = yield Promise.all(allProducts.map((product) => __awaiter(this, void 0, void 0, function* () {
                const salesProduct = yield Sales_1.SaleModel.find({
                    id_user: id,
                    id_product: product.id_product,
                });
                const purchasesProduct = yield Purchases_1.PurchaseModel.find({
                    id_user: id,
                    id_product: product.id_product,
                });
                const dataMonth = (0, calculatePerMonth_1.calculatePerMonth)(salesProduct, purchasesProduct);
                const relevantStatistics = (0, relevantStatistics_1.getRelevantStatistics)(dataMonth);
                return { relevantStatistics, product, dataMonth };
            })));
            res.status(200).send({ dataProduct });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error" });
        }
    });
}
exports.getProductsByUser = getProductsByUser;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { storage, id_user, price_purchased, price_saled, id_product } = data;
            const productData = new product_1.Product(data);
            const purchasedData = {
                storage,
                id_user,
                id_product: productData.id_product,
                price_purchased,
                price_saled,
                pieces_purchased: storage,
            };
            const responseP = yield Products_1.ProductModel.create(productData);
            console.log(responseP);
            yield Purchases_1.PurchaseModel.create(purchasedData);
            return res.status(200).json({ message: "Produto criado com sucesso." });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro de servidor" });
        }
    });
}
exports.createProduct = createProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const product = yield Products_1.ProductModel.findOne({ id_product: id });
            if (!product) {
                return res.status(404).json({ error: "O Produto não existe " });
            }
            yield product.delete();
            return res.status(200).send({ message: "Produto removido com sucesso." });
        }
        catch (error) {
            return res.status(500).send({ message: "Erro no servidor" });
        }
    });
}
exports.deleteProduct = deleteProduct;
function editProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const idProduct = req.params.id;
            const product = Products_1.ProductModel.findOne({ id_product: idProduct });
            yield product.update(data);
            return res.status(200).json({ message: "atualizado com sucesso" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    });
}
exports.editProduct = editProduct;
function purchasedProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const purchasedData = new purchase_1.Purchase(data);
            console.log(purchasedData);
            yield Purchases_1.PurchaseModel.create(purchasedData);
            return res.status(200).json({ message: "Sucesso" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    });
}
exports.purchasedProduct = purchasedProduct;
function saledProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const dataSaled = new sale_1.Sale(data);
            yield Sales_1.SaleModel.create(dataSaled);
            return res.status(200).json({ message: "Sucesso" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    });
}
exports.saledProduct = saledProduct;
