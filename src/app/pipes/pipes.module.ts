import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchPipe } from './product-search.pipe';



@NgModule({
  declarations: [ProductSearchPipe],
  imports: [
    CommonModule
  ],exports:[
    ProductSearchPipe
  ]
})
export class PipesModule { }
