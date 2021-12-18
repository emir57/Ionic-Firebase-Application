import { Product } from "./product";

export interface OrderedProduct extends Product{
  quantity:number;
}
