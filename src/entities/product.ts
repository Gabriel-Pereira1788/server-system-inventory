import { uuid } from "uuidv4";

export class Product {
  id_product?: string;
  id_user?: string;
  name_product?: string;
  price_purchased?: number;
  price_saled?: number;
  storage?: number;
  category?: string;
  path_image?: string;
  constructor(props: Omit<Product, "id_product">, id_product?: string) {
    Object.assign(this, props);
    if (!id_product) {
      this.id_product = uuid();
    }
  }
}
