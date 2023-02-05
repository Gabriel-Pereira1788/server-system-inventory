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
exports.getBestSelling = void 0;
const Products_1 = require("../models/Products");
function getBestSelling(dataSales) {
    return __awaiter(this, void 0, void 0, function* () {
        const maxSaled = Math.max(...dataSales.map((day) => day.pieces_saled));
        const sale = dataSales.find((day) => day.pieces_saled === maxSaled);
        const product = sale
            ? yield Products_1.ProductModel.findOne({
                id_product: sale.id_product,
            })
            : null;
        return {
            product,
            data_sale: sale ? sale : null,
        };
    });
}
exports.getBestSelling = getBestSelling;
