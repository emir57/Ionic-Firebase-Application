import { Product } from "./product";

export interface Order{
  id?:string;
  userId:string;
  totalPrice:number;
  addressText:string;
  city:string;
  products:Product[]
}
