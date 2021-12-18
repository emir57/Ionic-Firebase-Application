import { Product } from "./product";
import { User } from "./user";

export interface Cart{
  id?:string;
  productId:string,
  userId:string,
  quantity:number;
}
