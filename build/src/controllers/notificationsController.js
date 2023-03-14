"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotification = exports.getNotifications = exports.createNotification = void 0;
const notification_1 = require("../entities/notification");
const Notification_1 = require("../models/Notification");
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const dataNotification = new notification_1.Notification(data);
        yield Notification_1.NotificationModel.create(dataNotification);
        return res.status(200).json({ message: "Criado com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ message: "Erro no servidor" });
    }
});
exports.createNotification = createNotification;
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const allNotifications = yield Notification_1.NotificationModel.find({ id_user: id }).sort({ createdAt: -1 });
        return res.status(200).json({ notifications: allNotifications });
    }
    catch (error) {
        return res.status(500).json({ message: "Erro no servidor" });
    }
});
exports.getNotifications = getNotifications;
const readNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = req.body;
        const id = req.params.id;
        const notification = Notification_1.NotificationModel.find({ id_notification: id });
        yield notification.update({ read: true });
        return res.status(200).json({ message: "Atualizado com sucesso" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro no servidor" });
    }
});
exports.readNotification = readNotification;
