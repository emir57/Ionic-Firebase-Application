import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'getProductforCategory'
})
export class GetProductforCategoryPipe implements PipeTransform {

  transform(products: Product[], categoryId:string): Product[] {
    return categoryId=='0'?
      products:
      products.filter(x=>x.categoryId===categoryId)
  }

}
