import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryUpdatePage } from './category-update.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryUpdatePageRoutingModule {}
