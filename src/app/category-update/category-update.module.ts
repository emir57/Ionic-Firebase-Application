import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryUpdatePageRoutingModule } from './category-update-routing.module';

import { CategoryUpdatePage } from './category-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CategoryUpdatePageRoutingModule
  ],
  declarations: [CategoryUpdatePage]
})
export class CategoryUpdatePageModule {}
