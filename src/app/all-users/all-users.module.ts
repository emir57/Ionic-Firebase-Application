import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllUsersPageRoutingModule } from './all-users-routing.module';

import { AllUsersPage } from './all-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllUsersPageRoutingModule
  ],
  declarations: [AllUsersPage]
})
export class AllUsersPageModule {}
