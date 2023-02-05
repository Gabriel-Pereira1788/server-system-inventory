"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModel = void 0;
const mongoose_1 = require("mongoose");
const purchaseSchema = new mongoose_1.Schema({
    id: { type: String },
    id_product: { type: String },
    id_user: { type: String },
    pieces_purchased: { type: Number },
    price_purchased: { type: Number },
    price_saled: { type: Number },
    storage: { type: Number },
}, {
    timestamps: true,
});
exports.PurchaseModel = (0, mongoose_1.model)("purchases", purchaseSchema);
