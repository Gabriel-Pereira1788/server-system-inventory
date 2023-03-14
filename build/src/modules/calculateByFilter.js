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
exports.calculateByFilter = void 0;
const getBestSelling_1 = require("../functions/getBestSelling");
const filterDate_1 = require("./filterDate");
const calculateByFilter = (filter, dataSale, dataPurchased) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredPurchases = (0, filterDate_1.filterDate)(dataPurchased, filter);
    const filteredSales = (0, filterDate_1.filterDate)(dataSale, filter);
    return {
        parts_entered: filteredPurchases.reduce((acc, item) => (acc += item.pieces_purchased), 0),
        parts_leave: filteredSales.reduce((acc, item) => (acc += item.pieces_saled), 0),
        best_selling: yield (0, getBestSelling_1.getBestSelling)(filteredSales),
        total_sales: filteredSales.reduce((acc, item) => {
            const total = (item.price_saled - item.price_purchased) * item.pieces_saled;
            acc += total;
            return acc;
        }, 0),
    };
});
exports.calculateByFilter = calculateByFilter;
