import { NextFunction, Request, Response } from "express";

import { IDataPurchased } from "../types/IDataPurchased";
import { Notification } from "../entities/notification";
import { ProductModel } from "../models/Products";
import { NotificationModel } from "../models/Notification";

export const verifyStorage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: IDataPurchased = req.body;

  if (data.storage <= 5) {
    const product = await ProductModel.findOne({
      id_product: data.id_product,
      id_user: data.id_user,
    });
    const dataNotification = {
      id_user: data.id_user,
      type_notification: "repor estoque",
      item_alert: product?.name_product,
    };
    const notification = new Notification(dataNotification);
    console.log("notification", notification);
    await NotificationModel.create(notification);

    return next();
  }
  return next();
};
