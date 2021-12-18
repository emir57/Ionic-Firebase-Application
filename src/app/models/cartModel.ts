import { Cart } from "./cart";
import { Product } from "./product";
export interface CartModel extends Cart{
  product:Product
}
