import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartCheckPage } from './cart-check.page';

const routes: Routes = [
  {
    path: '',
    component: CartCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartCheckPageRoutingModule {}
