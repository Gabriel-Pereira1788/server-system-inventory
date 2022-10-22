import { timeStamp } from "console";
import { model, Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    id: { type: String },
    id_product: { type: String },
    id_user: { type: String },
    pieces_purchased: { type: Number },
    price_purchased: { type: Number },
    price_saled: { type: Number },
    storage: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const PurchaseModel = model("purchases", purchaseSchema);
