import { Product } from "./product";
import { User } from "./user";

export interface Cart{
  product:Product,
  user:User,
  quantity:number;
}
