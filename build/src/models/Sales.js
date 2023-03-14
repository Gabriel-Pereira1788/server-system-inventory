"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModel = void 0;
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
    id: { type: String },
    id_product: { type: String },
    id_user: { type: String },
    pieces_saled: { type: Number },
    price_purchased: { type: Number },
    price_saled: { type: Number },
    storage: { type: Number },
}, {
    timestamps: true,
});
exports.SaleModel = (0, mongoose_1.model)("sales", saleSchema);
