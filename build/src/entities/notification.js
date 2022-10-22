"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const uuidv4_1 = require("uuidv4");
class Notification {
    constructor(props, id_notification) {
        Object.assign(this, props);
        this.read = false;
        if (!id_notification) {
            this.id_notification = (0, uuidv4_1.uuid)();
        }
    }
}
exports.Notification = Notification;
