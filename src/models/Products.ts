import { timeStamp } from "console";
import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    id_product: { type: String },
    id_user: { type: String },
    name_product: { type: String },
    price_purchased: { type: Number },
    price_saled: { type: Number },
    storage: { type: Number },
    category: { type: String },
    path_image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model("products", productSchema);
