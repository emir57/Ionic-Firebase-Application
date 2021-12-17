export interface Product{
  id?:string;
  productName:string;
  description:string;
  categoryId:string;
  imageUrl:string;
  unitPrice:number;
  stock:number;
  discount:number;
  isDiscount:boolean
}
