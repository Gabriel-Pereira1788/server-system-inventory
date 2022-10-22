import { uuid } from "uuidv4";

export class Notification {
  id_notification?: string;
  id_user?: string;
  type_notification?: string;
  item_alert?: string;
  read?: boolean;
  constructor(
    props: Omit<Notification, "id_notification">,
    id_notification?: string
  ) {
    Object.assign(this, props);
    this.read = false;
    if (!id_notification) {
      this.id_notification = uuid();
    }
  }
}
