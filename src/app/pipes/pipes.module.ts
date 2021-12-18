import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchPipe } from './product-search.pipe';
import { UserSearchPipe } from './user-search.pipe';



@NgModule({
  declarations: [ProductSearchPipe, UserSearchPipe],
  imports: [
    CommonModule
  ],exports:[
    ProductSearchPipe,
    UserSearchPipe
  ]
})
export class PipesModule { }
