import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCategoriesPage } from './all-categories.page';

const routes: Routes = [
  {
    path: '',
    component: AllCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCategoriesPageRoutingModule {}
