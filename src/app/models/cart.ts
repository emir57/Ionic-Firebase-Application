import { Product } from "./product";
import { User } from "./user";

export interface Cart{
  id?:string;
  product:Product,
  user:User,
  quantity:number;
}
