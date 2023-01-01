export class Item {
  _id: string;
  name: string;
  upc: string;
  category_1: string;
  category_2: string;
  category_3: string;
  brand: string;
  specifications: { [key: string]: string };
  features: string[];
  standard_price: number;
  wholesale_cost: number;
}