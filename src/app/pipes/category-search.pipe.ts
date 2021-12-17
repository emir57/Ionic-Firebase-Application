import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'categorySearch'
})
export class CategorySearchPipe implements PipeTransform {

  transform(categories: Category[], searchString:string): Category[] {
    searchString = searchString ? searchString.toLocaleLowerCase():'';
    return searchString ?
      categories.filter(x=>x.name.toLocaleLowerCase().indexOf(searchString)!=-1):
      categories
  }

}
