"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = void 0;
const calculateTotal = (data, allProducts) => {
    const total_sales = Object.values(data).reduce((acc, value) => (acc += value.sales_amount), 0);
    const total_pieces_sales = Object.values(data).reduce((acc, value) => (acc += value.total_piece_sales), 0);
    const total_storage = allProducts.reduce((acc, product) => (acc += product.storage), 0);
    const total_price_saled = allProducts.reduce((acc, product) => (acc += product.price_saled), 0);
    const total_price_purchased = allProducts.reduce((acc, product) => (acc += product.price_purchased), 0);
    return {
        total_sales,
        total_pieces_sales,
        total_storage,
        total_price_saled,
        total_price_purchased,
    };
};
exports.calculateTotal = calculateTotal;
