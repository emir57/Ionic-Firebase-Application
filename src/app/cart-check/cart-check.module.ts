import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartCheckPageRoutingModule } from './cart-check-routing.module';

import { CartCheckPage } from './cart-check.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CartCheckPageRoutingModule
  ],
  declarations: [CartCheckPage]
})
export class CartCheckPageModule {}
