import { model, Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    id_notification: { type: String },
    id_user: { type: String },
    item_alert: { type: String },
    read: { type: Boolean },
    type_notification: { type: String },
  },
  {
    timestamps: true,
  }
);

export const NotificationModel = model("notifications", notificationSchema);
