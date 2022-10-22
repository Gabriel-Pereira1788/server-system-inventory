import { Request, Response, Router } from "express";
import {
  createNotification,
  getNotifications,
  readNotification,
} from "../controllers/notificationsController";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductsByUser,
  purchasedProduct,
  saledProduct,
} from "../controllers/productsControler";
import { getStatistics } from "../controllers/statisticsController";
import { verifyStorage } from "../middlewares/verifyStorage";
const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("Api Working");
  })
  .get("/products/:id", getProductsByUser)
  .post("/create-product/", createProduct)
  .delete("/delete-product/:id", deleteProduct)
  .patch("/edit-product/:id", verifyStorage, editProduct)
  .post("/purchased-product", purchasedProduct)
  .post("/saled-product", saledProduct)
  .get("/get-statistics/:id", getStatistics)
  .get("/get-notifications/:id", getNotifications)
  .post("/create-notification", createNotification)
  .get("/read-notification/:id", readNotification);
