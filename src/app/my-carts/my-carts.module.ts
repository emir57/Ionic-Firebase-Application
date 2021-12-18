import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCartsPageRoutingModule } from './my-carts-routing.module';

import { MyCartsPage } from './my-carts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCartsPageRoutingModule
  ],
  declarations: [MyCartsPage]
})
export class MyCartsPageModule {}
