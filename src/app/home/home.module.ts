import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DiscountPipe } from '../pipes/discount.pipe';
import { ProductSearchPipe } from '../pipes/product-search.pipe';
import { GetProductforCategoryPipe } from '../pipes/get-productfor-category.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,DiscountPipe,ProductSearchPipe,GetProductforCategoryPipe]
})
export class HomePageModule {}
