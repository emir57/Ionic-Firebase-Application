import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartCheckPageRoutingModule } from './cart-check-routing.module';

import { CartCheckPage } from './cart-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartCheckPageRoutingModule
  ],
  declarations: [CartCheckPage]
})
export class CartCheckPageModule {}
