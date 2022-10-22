export interface ITestProduct {
  name: string;
  priceSale: number;
  storage: number;
  pricePurchased: number;
  date: Date;
}

export interface IProduct {
  id_product?: string;
  name_product: string;
  price_saled: number;
  storage: number;
  price_purchased: number;
  id_user: string;
}
