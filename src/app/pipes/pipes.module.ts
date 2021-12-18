import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchPipe } from './product-search.pipe';
import { UserSearchPipe } from './user-search.pipe';
import { DiscountPipe } from './discount.pipe';



@NgModule({
  declarations: [ProductSearchPipe, UserSearchPipe,DiscountPipe],
  imports: [
    CommonModule
  ],exports:[
    ProductSearchPipe,
    UserSearchPipe,
    DiscountPipe
  ]
})
export class PipesModule { }
