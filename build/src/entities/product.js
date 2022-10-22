"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const uuidv4_1 = require("uuidv4");
class Product {
    constructor(props, id_product) {
        Object.assign(this, props);
        if (!id_product) {
            this.id_product = (0, uuidv4_1.uuid)();
        }
    }
}
exports.Product = Product;
