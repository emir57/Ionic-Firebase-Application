import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllUsersPage } from './all-users.page';

const routes: Routes = [
  {
    path: '',
    component: AllUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUsersPageRoutingModule {}
