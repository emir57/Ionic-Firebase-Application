import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(price: number, discount:number,isDiscount:boolean): number {
    let discountPrice = price - (price*discount/100);
    return isDiscount?
      discountPrice:
      price;
  }

}
