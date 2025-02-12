import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { Observable, Subject } from 'rxjs';
import { AllCategoriesPage } from '../all-categories/all-categories.page';
import { AllProductsPage } from '../all-products/all-products.page';
import { CategoryAddPage } from '../category-add/category-add.page';
import { Cart } from '../models/cart';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { User } from '../models/user';
import { ProductAddPage } from '../product-add/product-add.page';
import { ProductDetailPage } from '../product-detail/product-detail.page';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: User;
  selectedCategoryId = "0";
  searchString = "";
  products: Product[] = []
  categories: Category[] = []
  constructor(
    public modalController: ModalController,
    private menu: MenuController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private cartService: CartService
  ) {
  }

  async ngOnInit() {
    this.currentUser = this.authService.getUserInStorage();
    this.getProducts().subscribe(products => {
      this.products = products.sort((x,y)=>x.stock-y.stock).reverse();
    })
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    })

  }
  getProducts(): Observable<any> {
    let products: Product[] = []
    const subject = new Subject<any>();
    this.productService.getProducts().subscribe(doc => {
      doc.forEach(d => products.push(Object.assign({ id: d.id }, d.data())))
      subject.next(products);
    })
    return subject.asObservable();
  }
  getCategories(): Observable<any> {
    let categories: Category[] = []
    const subject = new Subject<any>();
    this.categoryService.getCategories().subscribe(doc => {
      doc.forEach(d => categories.push(Object.assign({ id: d.id }, d.data())))
      subject.next(categories);
    })
    return subject.asObservable();
  }

  async productDetailModal(product: Product) {
    const modal = await this.modalController.create({
      component: ProductDetailPage,
      componentProps: { product: product }
    })
    return await modal.present();
  }

  async showProductAddModal() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ProductAddPage
    })
    return await modal.present();
  }
  async showCategoryAddModal() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: CategoryAddPage
    })
    return await modal.present();
  }

  openMenu() {
    this.menu.enable(true, "first")
    this.menu.open("first")
  }

  async showAllCategories() {
    const modal = await this.modalController.create({
      component: AllCategoriesPage
    })
    return await modal.present();
  }
  async showAllProducts() {
    const modal = await this.modalController.create({
      component: AllProductsPage
    })
    return await modal.present();
  }

  logout() {
    this.modalController.dismiss();
    this.authService.logout()
      .catch(error => {
        console.log(error)
      }).finally(() => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        this.presentToast("Başarıyla çıkış yapıldı")
      })
    this.router.navigate(["/login"])
  }



  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  isInRoleAdmin() {
    let user = this.authService.getUserInStorage();
    return this.authService.isInRole(user, "Admin")
  }

  addToCart(product: Product) {
    let cart: Cart;
    cart = {
      productId: product.id,
      userId: this.currentUser.id,
      quantity:0
    }
    this.cartService.addToCart(cart)
    this.presentToast("Sepete Yönlendiriliyorsunuz.")
    setTimeout(() => {
      this.router.navigate(["my-carts"])
    }, 1000);
  }

  standardList(){
    this.products.sort((x,y)=>x.stock-y.stock).reverse()
  }
  orderList(){
    this.products.sort((x,y)=>x.unitPrice-y.unitPrice);
  }
  reverseList(){
    this.products.sort((x,y)=>x.unitPrice-y.unitPrice).reverse();
  }
}
