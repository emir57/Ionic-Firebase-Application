import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(product: Product[], searchString:string): Product[] {
    searchString = searchString ? searchString.toLocaleLowerCase():'';
    return searchString?
    product
    .filter(p=>p.productName.toLocaleLowerCase().indexOf(searchString)!=-1||
    p.description.toLocaleLowerCase().indexOf(searchString)!=-1):
    product
  }

}
