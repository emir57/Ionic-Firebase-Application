import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCartsPage } from './my-carts.page';

const routes: Routes = [
  {
    path: '',
    component: MyCartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCartsPageRoutingModule {}
