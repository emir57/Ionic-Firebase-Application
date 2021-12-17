import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductAddPageRoutingModule } from './product-add-routing.module';

import { ProductAddPage } from './product-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductAddPageRoutingModule
  ],
  declarations: [ProductAddPage]
})
export class ProductAddPageModule {}
