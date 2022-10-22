"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationsController_1 = require("../controllers/notificationsController");
const productsControler_1 = require("../controllers/productsControler");
const statisticsController_1 = require("../controllers/statisticsController");
const verifyStorage_1 = require("../middlewares/verifyStorage");
const router = (0, express_1.Router)();
exports.default = router
    .get("/test", (req, res) => {
    res.status(200).send("Api Working");
})
    .get("/products/:id", productsControler_1.getProductsByUser)
    .post("/create-product/", productsControler_1.createProduct)
    .delete("/delete-product/:id", productsControler_1.deleteProduct)
    .patch("/edit-product/:id", verifyStorage_1.verifyStorage, productsControler_1.editProduct)
    .post("/purchased-product", productsControler_1.purchasedProduct)
    .post("/saled-product", productsControler_1.saledProduct)
    .get("/get-statistics/:id", statisticsController_1.getStatistics)
    .get("/get-notifications/:id", notificationsController_1.getNotifications)
    .post("/create-notification", notificationsController_1.createNotification)
    .get("/read-notification/:id", notificationsController_1.readNotification);
