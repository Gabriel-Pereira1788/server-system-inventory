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
exports.getStatistics = void 0;
const Products_1 = require("../models/Products");
const Purchases_1 = require("../models/Purchases");
const Sales_1 = require("../models/Sales");
const calculateByFilter_1 = require("../modules/calculateByFilter");
const calculatePerMonth_1 = require("../modules/calculatePerMonth");
const calculateTotal_1 = require("../modules/calculateTotal");
const relevantStatistics_1 = require("../modules/relevantStatistics");
function getStatistics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idUser = req.params.id;
            const { filter } = req.query;
            if (filter) {
                return getStatisticsByFilter(idUser, filter, res);
            }
            console.log(req);
            const allProducts = yield Products_1.ProductModel.find({ id_user: idUser });
            const allSales = yield Sales_1.SaleModel.find({ id_user: idUser });
            const allPurchases = yield Purchases_1.PurchaseModel.find({ id_user: idUser });
            const dataMonth = (0, calculatePerMonth_1.calculatePerMonth)(allSales, allPurchases);
            const dataTotal = (0, calculateTotal_1.calculateTotal)(dataMonth, allProducts);
            const relevantStatistics = (0, relevantStatistics_1.getRelevantStatistics)(dataMonth);
            return res.status(200).json({ dataMonth, dataTotal, relevantStatistics });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    });
}
exports.getStatistics = getStatistics;
function getStatisticsByFilter(idUser, filter, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(filter);
            const allProducts = yield Products_1.ProductModel.find({ id_user: idUser });
            const allSales = yield Sales_1.SaleModel.find({ id_user: idUser });
            const allPurchases = yield Purchases_1.PurchaseModel.find({ id_user: idUser });
            const statisticsByFilter = yield (0, calculateByFilter_1.calculateByFilter)(filter, allSales, allPurchases);
            console.log(statisticsByFilter);
            return res.status(200).json(Object.assign(Object.assign({}, statisticsByFilter), { total_product: allProducts.length, total_storage: allProducts.reduce((acc, product) => (acc += product.storage ? product.storage : 0), 0) }));
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro no servidor" });
        }
    });
}
