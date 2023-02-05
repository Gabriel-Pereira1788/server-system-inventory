"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    id_notification: { type: String },
    id_user: { type: String },
    item_alert: { type: String },
    read: { type: Boolean },
    type_notification: { type: String },
}, {
    timestamps: true,
});
exports.NotificationModel = (0, mongoose_1.model)("notifications", notificationSchema);
