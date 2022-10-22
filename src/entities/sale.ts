import { uuid } from "uuidv4";

export class Sale {
  id?: string;
  id_product?: string;
  id_user?: string;
  pieces_saled?: number;
  price_purchased?: number;
  price_saled?: number;
  storage?: number;
  constructor(props: Omit<Sale, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    }
  }
}
