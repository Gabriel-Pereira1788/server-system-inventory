import { timeStamp } from "console";
import { model, Schema } from "mongoose";

const saleSchema = new Schema(
  {
    id: { type: String },
    id_product: { type: String },
    id_user: { type: String },
    pieces_saled: { type: Number },
    price_purchased: { type: Number },
    price_saled: { type: Number },
    storage: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const SaleModel = model("sales", saleSchema);
