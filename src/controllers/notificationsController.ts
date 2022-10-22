import { Request, response, Response } from "express";

import { Notification } from "../entities/notification";
import { NotificationModel } from "../models/Notification";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const dataNotification = new Notification(data);
    await NotificationModel.create(dataNotification);
    return res.status(200).json({ message: "Criado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const allNotifications = await NotificationModel.find({ id_user: id }).sort(
      { createdAt: -1 }
    );

    return res.status(200).json({ notifications: allNotifications });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const readNotification = async (req: Request, res: Response) => {
  try {
    // const data = req.body;
    const id = req.params.id;
    const notification = NotificationModel.find({ id_notification: id });
    await notification.update({ read: true });
    return res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
