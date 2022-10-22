export interface IDataPurchased {
  purchase: boolean;
  storage: number;
  id_user: string;
  id_product: string | undefined;
  price_purchased: number;
  price_saled: number;
  date: Date;
}
