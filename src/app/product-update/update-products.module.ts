import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProductsPageRoutingModule } from './update-products-routing.module';

import { UpdateProductsPage } from './update-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateProductsPageRoutingModule
  ],
  declarations: [UpdateProductsPage]
})
export class UpdateProductsPageModule {}
