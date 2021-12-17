import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from './guards/security.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[SecurityGuard]
  },
  {
    path: 'product-add',
    loadChildren: () => import('./product-add/product-add.module').then( m => m.ProductAddPageModule)
  },
  {
    path: 'category-add',
    loadChildren: () => import('./category-add/category-add.module').then( m => m.CategoryAddPageModule)
  },
  {
    path: 'all-products',
    loadChildren: () => import('./all-products/all-products.module').then( m => m.AllProductsPageModule)
  },
  {
    path: 'all-categories',
    loadChildren: () => import('./all-categories/all-categories.module').then( m => m.AllCategoriesPageModule)
  },
  {
    path: 'update-products',
    loadChildren: () => import('./product-update/update-products.module').then( m => m.UpdateProductsPageModule)
  },
  {
    path: 'category-update',
    loadChildren: () => import('./category-update/category-update.module').then( m => m.CategoryUpdatePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
