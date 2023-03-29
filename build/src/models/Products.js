"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    id_product: { type: String },
    id_user: { type: String },
    name_product: { type: String },
    price_purchased: { type: Number },
    price_saled: { type: Number },
    storage: { type: Number },
    category: { type: String },
    path_image: { type: String },
}, {
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)("products", productSchema);
