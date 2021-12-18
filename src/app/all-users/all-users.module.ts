import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllUsersPageRoutingModule } from './all-users-routing.module';

import { AllUsersPage } from './all-users.page';
import { UserSearchPipe } from '../pipes/user-search.pipe';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllUsersPageRoutingModule,
    PipesModule
  ],
  declarations: [AllUsersPage]
})
export class AllUsersPageModule {}
