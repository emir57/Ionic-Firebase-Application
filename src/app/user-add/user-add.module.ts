import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAddPageRoutingModule } from './user-add-routing.module';

import { UserAddPage } from './user-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserAddPageRoutingModule
  ],
  declarations: [UserAddPage]
})
export class UserAddPageModule {}
